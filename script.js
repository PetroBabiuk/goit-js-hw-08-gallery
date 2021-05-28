import gallery from "./gallery-items.js";

const galleryListRef = document.querySelector('.js-gallery');
const lightBoxRef = document.querySelector('.js-lightbox');
const modalImageRef = document.querySelector('.lightbox__image');
const closeButtonRef = document.querySelector('.lightbox__button');

const originalImages = gallery.map((item) => item.original);

function createElementOfGallery(gallery) {
    return gallery.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    }).join('');
}

const galleryMarkup = createElementOfGallery(gallery);
galleryListRef.insertAdjacentHTML('beforeend', galleryMarkup);

galleryListRef.addEventListener('click', onGalleryElementClick);
closeButtonRef.addEventListener('click', onModalCloseButton);
lightBoxRef.addEventListener('click', onBackdropClickClose);

function onGalleryElementClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== "IMG") return;
    onModalOpen();
    setModalImage(event);
  window.addEventListener("keydown", onEscPress);
  window.addEventListener("keydown", onArrowPress);
}

function setModalImage(event) {
  modalImageRef.src = event.target.dataset.source;
  modalImageRef.alt = event.target.alt;
}

function onModalOpen() {
  lightBoxRef.classList.add("is-open");
}

function onModalCloseButton(event) {
  lightBoxRef.classList.remove("is-open");
    modalImageRef.src = "";
    modalImageRef.alt = "";
    
  window.removeEventListener("keydown", onEscPress);
  window.removeEventListener("keydown", onArrowPress);
}

function onBackdropClickClose(event) {
  if (event.target.nodeName !== "IMG") {
    onModalCloseButton(event);
  }
}

function onEscPress(event) {
  if (event.key === "Escape") {
    onModalCloseButton(event);
  }
}

function onArrowPress(event) {
  let newIndex;
  const currentId = originalImages.indexOf(modalImageRef.src);
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    newIndex = currentId - 1;
    if (newIndex === -1) {
      newIndex = originalImages.length - 1;
    }
  } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    newIndex = currentId + 1;
    if (newIndex === originalImages.length) {
      newIndex = 0;
    }
  } 
  modalImageRef.src = originalImages[newIndex];
}