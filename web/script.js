// Referencias al DOM
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const categorySelect = document.getElementById('categorySelect');
const imageSelect = document.getElementById('imageSelect');
const colorPicker = document.getElementById('colorPicker');
const fillModeBtn = document.getElementById('fillModeBtn');
const eraseModeBtn = document.getElementById('eraseModeBtn');
const resetBtn = document.getElementById('resetBtn');
const statusText = document.getElementById('status');

// Catalogo de assets locales (carpetas por tipo)
const assetsByCategory = {
  formas: [
    { file: 'casa.png', label: 'Casa simple' },
    { file: 'estrella.png', label: 'Estrella grande' },
  ],
  mandalas: [
    { file: 'mandala-simple.png', label: 'Mandala simple' },
  ],
};

// Estado
let currentMode = 'fill'; // 'fill' | 'erase'
let originalImage = null; // ImageData de la imagen original cargada
let imageLoaded = false;

// Configuracion inicial del canvas
canvas.width = 800;
canvas.height = 600;
clearCanvas();
initAssetSelectors();

// Modos: rellenar / borrar
fillModeBtn.addEventListener('click', () => {
  currentMode = 'fill';
  fillModeBtn.classList.add('active');
  eraseModeBtn.classList.remove('active');
});

eraseModeBtn.addEventListener('click', () => {
  currentMode = 'erase';
  eraseModeBtn.classList.add('active');
  fillModeBtn.classList.remove('active');
});

// Reiniciar imagen
resetBtn.addEventListener('click', () => {
  if (!imageLoaded || !originalImage) return;
  ctx.putImageData(originalImage, 0, 0);
  setStatus('Imagen restaurada.', 'info');
});

// Click en canvas para rellenar / borrar
canvas.addEventListener('click', (e) => {
  if (!imageLoaded) return;

  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
  const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  if (currentMode === 'fill') {
    const fillColor = hexToRgba(colorPicker.value, 255);
    floodFill(imageData, x, y, fillColor);
  } else if (currentMode === 'erase') {
    const eraseColor = [255, 255, 255, 255]; // blanco
    floodFill(imageData, x, y, eraseColor);
  }

  ctx.putImageData(imageData, 0, 0);
});

// Inicializa selects con assets locales
function initAssetSelectors() {
  const categories = Object.keys(assetsByCategory);
  if (!categories.length) {
    setStatus('No hay imagenes configuradas en assets.', 'error');
    return;
  }

  categorySelect.innerHTML = '';
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = formatLabel(category);
    categorySelect.appendChild(option);
  });

  categorySelect.addEventListener('change', () => {
    populateImages(categorySelect.value);
  });

  imageSelect.addEventListener('change', () => {
    loadSelectedImage();
  });

  populateImages(categories[0]);
}

function populateImages(category) {
  const assets = assetsByCategory[category] || [];
  imageSelect.innerHTML = '';

  if (!assets.length) {
    clearCanvas();
    setStatus('No hay imagenes en esta categoria.', 'error');
    return;
  }

  assets.forEach((asset) => {
    const option = document.createElement('option');
    option.value = asset.file;
    option.textContent = asset.label;
    imageSelect.appendChild(option);
  });

  imageSelect.value = assets[0].file;
  loadSelectedImage();
}

function loadSelectedImage() {
  const category = categorySelect.value;
  const file = imageSelect.value;
  if (!category || !file) return;

  const img = new Image();
  imageLoaded = false;
  setStatus('Cargando imagen...');

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageLoaded = true;
    setStatus(`Imagen lista: ${file}`, 'success');
  };

  img.onerror = function() {
    clearCanvas();
    setStatus('No se pudo cargar la imagen seleccionada.', 'error');
  };

  img.src = `assets/${category}/${file}`;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  imageLoaded = false;
  originalImage = null;
}

function setStatus(message, state = 'info') {
  if (statusText) {
    statusText.textContent = message;
    statusText.dataset.state = state;
  }
}

function formatLabel(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Algoritmo de flood fill (scanline / BFS iterativo)
function floodFill(imageData, startX, startY, fillColor) {
  const { width, height, data } = imageData;
  const stack = [];
  const startPos = (startY * width + startX) * 4;

  const targetColor = [
    data[startPos],
    data[startPos + 1],
    data[startPos + 2],
    data[startPos + 3],
  ];

  // Si el color objetivo es igual al de relleno, no hacer nada
  if (colorsMatch(targetColor, fillColor)) return;

  stack.push([startX, startY]);

  const tolerance = 20; // tolerancia para considerar colores "iguales"

  while (stack.length > 0) {
    const [x, y] = stack.pop();
    let currentX = x;

    // Buscar borde izquierdo
    while (currentX >= 0 && colorWithinTolerance(imageData, currentX, y, targetColor, tolerance)) {
      currentX--;
    }
    currentX++;
    let spanAbove = false;
    let spanBelow = false;

    // Rellenar hacia la derecha
    while (currentX < width && colorWithinTolerance(imageData, currentX, y, targetColor, tolerance)) {
      setPixel(imageData, currentX, y, fillColor);

      // Fila superior
      if (y > 0) {
        if (colorWithinTolerance(imageData, currentX, y - 1, targetColor, tolerance)) {
          if (!spanAbove) {
            stack.push([currentX, y - 1]);
            spanAbove = true;
          }
        } else if (spanAbove) {
          spanAbove = false;
        }
      }

      // Fila inferior
      if (y < height - 1) {
        if (colorWithinTolerance(imageData, currentX, y + 1, targetColor, tolerance)) {
          if (!spanBelow) {
            stack.push([currentX, y + 1]);
            spanBelow = true;
          }
        } else if (spanBelow) {
          spanBelow = false;
        }
      }

      currentX++;
    }
  }
}

function getPixelOffset(imageData, x, y) {
  return (y * imageData.width + x) * 4;
}

function colorWithinTolerance(imageData, x, y, targetColor, tolerance) {
  const { data, width, height } = imageData;
  if (x < 0 || x >= width || y < 0 || y >= height) return false;
  const offset = getPixelOffset(imageData, x, y);
  const r = data[offset];
  const g = data[offset + 1];
  const b = data[offset + 2];
  const a = data[offset + 3];

  const dr = r - targetColor[0];
  const dg = g - targetColor[1];
  const db = b - targetColor[2];
  const da = a - targetColor[3];

  const distanceSq = dr * dr + dg * dg + db * db + da * da;
  return distanceSq <= tolerance * tolerance;
}

function setPixel(imageData, x, y, color) {
  const offset = getPixelOffset(imageData, x, y);
  const { data } = imageData;
  data[offset] = color[0];
  data[offset + 1] = color[1];
  data[offset + 2] = color[2];
  data[offset + 3] = color[3];
}

function colorsMatch(c1, c2) {
  return c1[0] === c2[0] &&
         c1[1] === c2[1] &&
         c1[2] === c2[2] &&
         c1[3] === c2[3];
}

function hexToRgba(hex, alpha = 255) {
  hex = hex.replace('#', '');
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  return [r, g, b, alpha];
}
