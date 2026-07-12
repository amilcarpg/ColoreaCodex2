# Prompt principal para Codex

Quiero que implementes la home publica de `paintme.club` reproduciendo lo mas fielmente posible el mockup visual de referencia adjunto.

## Objetivo

Construir una home nueva que se vea casi igual al mockup en composicion, jerarquia, tono visual y secciones. No quiero una reinterpretacion libre. Quiero una traduccion a codigo lo mas cercana posible, ajustando solo lo necesario por responsive, accesibilidad o limitaciones tecnicas reales.

## Regla principal de fidelidad

La implementacion debe priorizar fidelidad visual frente a reinterpretacion. Debes intentar replicar:

- composicion general
- estructura y orden de secciones
- jerarquia visual
- pesos y tamaños relativos
- estilo infantil calido
- tarjetas redondeadas
- sombras suaves
- paleta cromatica
- relacion entre texto, CTAs e ilustraciones
- look de producto real listo para lanzar

Permite solo ajustes menores cuando sean necesarios para:

- responsive
- semantica HTML
- accesibilidad
- rendimiento
- disponibilidad de assets exactos

No conviertas esto en una landing SaaS generica.  
No simplifiques el hero.  
No elimines secciones.  
No reemplaces bloques por alternativas mas estandar.  
No dejes placeholders vacios.

## Proceso obligatorio

Antes de implementar, analiza el mockup y transportalo a componentes 1 a 1. Debes mantener correspondencia directa entre los bloques del mockup y los bloques del codigo final. Piensa la pagina como una reconstruccion del diseño, no como una inspiracion.

## Estructura exacta requerida

### 1. Header

- Logo textual: `PaintMe.club`
- Navegacion: `Inicio`, `Categorias`, `Dibujos`, `FAQ`
- Header limpio, claro, con bastante aire, alineado al mockup
- Debe verse amigable y premium, no corporativo

### 2. Hero principal

Debe ser el bloque mas importante visualmente.

Estructura:

- columna izquierda con gran titular
- columna derecha con preview de la aplicacion
- fondo calido e ilustrado o con atmosfera amable similar al mockup

Contenido obligatorio:

- `H1: Dibujos para colorear gratis online`
- subtitulo `Elige un dibujo, toca una zona y pintala al instante. Sin registro, desde tu celular o computadora.`
- CTA principal `Empezar a colorear`
- CTA secundaria `Ver categorias`

Preview visual obligatoria:

- un marco grande tipo tablet o app
- canvas o ilustracion de un dibujo infantil coloreado
- columna lateral o zona visible de paleta de colores
- controles simples que recuerden una app real
- debe transmitir inmediatamente “aqui se colorea”

No reduzcas este bloque a una captura pequeña. Debe ocupar mucho protagonismo, como en el mockup.

### 3. Banda de beneficios

Debajo del hero, incluir una franja o bloque horizontal con 4 beneficios:

- `Gratis`
- `Sin registro`
- `Funciona en movil`
- `Guarda en PNG`

Cada beneficio debe tener:

- icono o elemento visual
- titulo
- breve texto de soporte

### 4. Categorias

Titulo:

- `Categorias`

Tarjetas obligatorias:

- `Animales`
- `Vehiculos`
- `Navidad`
- `Fantasia`
- `Dinosaurios`
- `Princesas`

Requisitos:

- tarjetas grandes y coloridas
- cada una con personalidad visual propia
- labels muy visibles
- layout muy similar al mockup
- no usar simple lista textual

### 5. Dibujos populares

Titulo:

- `Dibujos populares`

Contenido:

- 8 cards con miniaturas:
  - gato
  - perro
  - auto
  - arbol de navidad
  - dinosaurio
  - castillo
  - mariposa
  - cohete

Cada card:

- miniatura clara
- estilo consistente
- boton visible: `Colorear`

### 6. Como funciona

Titulo:

- `Como funciona`

Tres pasos horizontales:

- `1. Elige un dibujo`
- `2. Toca para colorear`
- `3. Guarda tu creacion`

Cada paso debe tener:

- numero visible
- titulo
- texto breve
- apoyo visual o iconografico

### 7. Aprender jugando

Titulo:

- `Aprender jugando`

Tres bloques:

- `Estimula la creatividad`
- `Mejora la coordinacion`
- `Diversion sin complicaciones`

Requisitos:

- look editorial amable
- tarjetas suaves
- equilibrio entre texto y visuales
- orientacion clara a padres y familias

### 8. FAQ

Titulo:

- `Preguntas frecuentes`

Preguntas obligatorias:

- `¿Necesito crear una cuenta?`
- `¿Funciona en celular?`
- `¿Puedo guardar mi dibujo?`
- `¿Tiene costo?`

Requisitos:

- estilo acordeon visual
- limpio y consistente
- accesible con teclado
- visualmente parecido al mockup

### 9. Footer

Contenido:

- `PaintMe.club`
- enlaces: `Inicio`, `Categorias`, `Politica de privacidad`, `Contacto`
- texto: `Dibujos para colorear online para niños y familias.`

## Direccion visual obligatoria

Usa una direccion visual muy cercana al mockup:

- estetica infantil moderna
- calida y luminosa
- fondo crema o marfil suave
- acentos coral, azul cielo, amarillo y verde suave
- tipografia redondeada y con personalidad
- titulos grandes y amistosos
- esquinas redondeadas
- sombras suaves
- espaciado generoso
- bloques con sensacion de producto pulido

No uses:

- estetica enterprise
- morado por defecto
- fondos planos aburridos
- cards genericas de dashboard
- layout tipo plantilla SaaS

## Responsive

Debe funcionar bien en desktop y movil.

En movil:

- hero apilado sin perder impacto
- CTAs visibles arriba
- categorias en 2 columnas o layout equivalente claro
- cards legibles
- FAQ usable
- sin overflow horizontal

## Accesibilidad y calidad

- HTML semantico
- buena jerarquia de headings
- contraste suficiente
- estados focus visibles
- botones y links claros
- imagenes con alt cuando aplique
- evitar texto incrustado innecesario en imagenes si rompe accesibilidad

## Assets

Si no existen los assets exactos del mockup:

- crea una aproximacion visual ordenada y coherente
- usa ilustraciones temporales, bloques decorativos o placeholders elegantes integrados al diseño
- no rompas la composicion
- deja claro en el codigo que assets serian reemplazables despues

## Restricciones de implementacion

- preserva el stack existente del proyecto
- no rehagas toda la arquitectura si no hace falta
- implementa sobre la home publica real o crea el entrypoint correcto si falta
- manten el codigo limpio y reusable
- evita sobreingenieria

## Entregables

Quiero que entregues:

- la home implementada
- estilos completos
- comportamiento responsive
- resumen final breve con:
  - archivos modificados
  - decisiones principales
  - diferencias inevitables respecto al mockup, si existieran

## Checklist de validacion visual obligatoria

Antes de terminar, verifica y confirma explicitamente:

- el hero ocupa el mayor peso visual de la pagina
- la home conserva el mismo orden de secciones del mockup
- hay 6 tarjetas de categorias visibles y diferenciadas
- hay 8 cards en `Dibujos populares`
- la seccion `Como funciona` tiene 3 pasos claros
- la seccion `Aprender jugando` tiene 3 bloques
- el `FAQ` contiene las 4 preguntas pedidas
- la estetica general se siente infantil, calida y moderna
- en movil no hay scroll horizontal
- el resultado final se percibe como una traduccion del mockup, no una reinterpretacion generica

## Criterio de exito

El resultado debe hacer que una persona vea la pagina y diga:

`si, esta es claramente la version codificada de ese mockup`

Si durante la implementacion encuentras una diferencia entre fidelidad visual y una limitacion tecnica menor, favorece la fidelidad visual y documenta el ajuste al final.
