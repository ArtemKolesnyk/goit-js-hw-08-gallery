import itemsDefault from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'), 
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'), 
  modalImage: document.querySelector('.lightbox__image'),
  modalOverlay: document.querySelector('.lightbox__overlay'), 
};
const ARR_RIGHT_KEY_CODE = 'ArrowRight';
const ESC_KEY_CODE = 'Escape';
const ARR_LEFT_KEY_CODE = 'ArrowLeft';

const galleryMarkup = createGalleryMarkup(itemsDefault);
refs.galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(elements) {
  return elements
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

refs.galleryList.addEventListener('click', onOpenModal);

function onOpenModal(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  evt.preventDefault(); 
  refs.modal.classList.add('is-open'); 
  const {dataset, alt} = evt.target;
  updateAttr(dataset.source, alt);
  updateEventListener('addEventListener');
}

function updateAttr(src = '', alt = '') {
  refs.modalImage.src = src; 
  refs.modalImage.alt = alt;
}

function updateEventListener(key) {
  document[key]('keydown', onEscKeyPress); 
  document[key]('keydown', onArrowLeftPress);
  document[key]('keydown', onArrowRightPress);
}

refs.modalCloseBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.modal.classList.remove('is-open');
  updateAttr();
  updateEventListener('removeEventListener');
}

refs.modalOverlay.addEventListener('click', onBOverlayClick);

function onBOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

const onEscKeyPress = (event) => {
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

function onArrowLeftPress(evt) {
  const isArrLeftKey = evt.code === ARR_LEFT_KEY_CODE;
  if (isArrLeftKey) {
    let indexOfCurrentImg = getIndex();

    if (indexOfCurrentImg === 0) {
      indexOfCurrentImg = itemsDefault.length;
    }
    slider(indexOfCurrentImg -1);
  }
}

function slider(index) {
  const {original, description} = itemsDefault[index];
    updateAttr(original, description);
}

function getIndex() {
  const sources = itemsDefault.map(({ original }) => original);
    return sources.indexOf(refs.modalImage.src);
}


function onArrowRightPress(evt) {
  const isArrRightKey = evt.code === ARR_RIGHT_KEY_CODE;
  
  if (isArrRightKey) {
    let indexOfCurrentImg = getIndex();
    if (indexOfCurrentImg + 1 > itemsDefault.length - 1) {
      indexOfCurrentImg = -1;
    } 
    slider(indexOfCurrentImg +1);
  }
}

