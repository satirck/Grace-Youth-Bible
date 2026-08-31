document.getElementById('year').textContent = new Date().getFullYear();

/* mobile menu */
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.hasAttribute('data-open');
  menu.toggleAttribute('data-open', !open);
  burger.setAttribute('aria-expanded', String(!open));
});
menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    menu.removeAttribute('data-open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

/* gallery */
const photos = [
  { src: 'images/IMG_2755.jpg', span: 'g-lg', alt: 'Общее фото молодёжи' },
  { src: 'images/IMG_2756.jpg', span: 'g-sm', alt: 'Встреча служения' },
  { src: 'images/IMG_2759.jpg', span: 'g-sm', alt: 'Изучение Писания' },
  { src: 'images/IMG_2763.jpg', span: 'g-md', alt: 'Общение после встречи' },
  { src: 'images/IMG_2758.jpg', span: 'g-md', alt: 'Молодёжное служение' }
];

const grid = document.getElementById('gallery-grid');
photos.forEach((p, i) => {
  const img = new Image();
  img.src = p.src;
  img.alt = p.alt;
  img.className = 'washed ' + p.span;
  img.loading = i > 1 ? 'lazy' : 'eager';
  img.decoding = 'async';
  img.tabIndex = 0;
  img.addEventListener('click', () => openLightbox(p.src, p.alt));
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(p.src, p.alt); }
  });
  grid.appendChild(img);
});

/* lightbox */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let lastFocused = null;

function openLightbox(src, alt) {
  lastFocused = document.activeElement;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.setAttribute('open', '');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightbox-close').focus();
}

function closeLightbox() {
  lightbox.removeAttribute('open');
  lightboxImg.removeAttribute('src');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.hasAttribute('open')) closeLightbox();
});
