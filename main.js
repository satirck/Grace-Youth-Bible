document.getElementById('year').textContent = new Date().getFullYear();

const imageFiles = [
  'IMG_2755.jpg',
  'IMG_2756.jpg',
  'IMG_2758.jpg',
  'IMG_2759.jpg',
  'IMG_2763.jpg'
];

const galleryInner = document.getElementById('galleryInner');
const galleryIndicators = document.getElementById('galleryIndicators');
if (galleryInner && galleryIndicators) {
  imageFiles.forEach((file, index) => {
    const src = `images/${file}`;

    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.setAttribute('data-bs-target', '#galleryCarousel');
    indicator.setAttribute('data-bs-slide-to', String(index));
    indicator.setAttribute('aria-label', `Slide ${index+1}`);
    if (index === 0) {
      indicator.className = 'active';
      indicator.setAttribute('aria-current', 'true');
    }
    galleryIndicators.appendChild(indicator);

    const item = document.createElement('div');
    item.className = 'carousel-item' + (index === 0 ? ' active' : '');

    const link = document.createElement('a');
    link.href = src;
    link.setAttribute('data-bs-toggle', 'modal');
    link.setAttribute('data-bs-target', '#lightboxModal');

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'GYB photo';
    img.className = 'd-block w-100';

    link.appendChild(img);
    item.appendChild(link);
    galleryInner.appendChild(item);
  });
}

const modalHtml = `
  <div class="modal fade" id="lightboxModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content bg-dark">
        <div class="modal-body p-0">
          <img class="modal-img" alt="Preview">
        </div>
        <div class="modal-footer justify-content-between bg-dark border-0">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Закрыть</button>
          <div class="text-light small">Grace Youth Bible</div>
        </div>
      </div>
    </div>
  </div>`;

document.body.insertAdjacentHTML('beforeend', modalHtml);

const lightboxModal = document.getElementById('lightboxModal');
if (lightboxModal) {
  const modalImg = lightboxModal.querySelector('img');
  lightboxModal.addEventListener('show.bs.modal', (ev) => {
    const trigger = ev.relatedTarget;
    if (trigger && modalImg) {
      const href = trigger.getAttribute('href');
      modalImg.src = href;
    }
  });
}

document.documentElement.style.setProperty('--hero-image', 'url("images/IMG_2758.jpg")');
