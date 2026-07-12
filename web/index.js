const faqItems = Array.from(document.querySelectorAll('.faq-item'));
const faqTriggers = Array.from(document.querySelectorAll('.faq-trigger'));
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
const observedSections = ['inicio', 'categorias', 'dibujos', 'faq']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

faqTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.faq-item');
    const panel = item?.querySelector('.faq-panel');
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    faqItems.forEach((faqItem) => {
      const faqTrigger = faqItem.querySelector('.faq-trigger');
      const faqPanel = faqItem.querySelector('.faq-panel');
      faqItem.classList.remove('is-open');
      faqTrigger?.setAttribute('aria-expanded', 'false');
      if (faqPanel) {
        faqPanel.hidden = true;
      }
    });

    if (item && panel && !isOpen) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
    }
  });
});

if ('IntersectionObserver' in window && observedSections.length) {
  const observer = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry?.target?.id) return;
    const activeId = visibleEntry.target.id;

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('is-active', isActive);
    });
  }, {
    threshold: [0.35, 0.6, 0.9],
    rootMargin: '-15% 0px -45% 0px',
  });

  observedSections.forEach((section) => observer.observe(section));
}
