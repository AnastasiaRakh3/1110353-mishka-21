const nav = document.querySelector('.page-header__nav');
const navToggle = document.querySelector('.page-header__nav-toggle');

const modalWrapper = document.querySelector(".modal");
const modalBtnPromo = document.querySelector(".modal-btn-promo");
const modalBtnCatalog = document.querySelector(".modal-btn-catalog");
const modalPromo = document.querySelector(".modal__item--promo");
const modalCatalog = document.querySelector(".modal__item--catalog");


nav.classList.remove('page-header__nav--nojs');

navToggle.addEventListener('click', function () {
  if (nav.classList.contains('page-header__nav--closed')) {
    nav.classList.remove('page-header__nav--closed');
    nav.classList.add('page-header__nav--opened');
  } else {
    nav.classList.remove('page-header__nav--opened');
    nav.classList.add('page-header__nav--closed');
  }
})

  modalBtnPromo.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalPromo.classList.add("modal__item--show");
    modalWrapper.classList.add("modal--show");
  });

  modalBtnCatalog.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalCatalog.classList.add("modal__item--show");
    modalWrapper.classList.add("modal--show");
  });

  modalWrapper.addEventListener("click", function () {
    if (modalPromo.classList.contains("modal__item--show") || modalCatalog.classList.contains("modal__item--show")) {
      modalPromo.classList.remove("modal__item--show");
      modalCatalog.classList.remove("modal__item--show");
      modalWrapper.classList.remove("modal--show");
    }
  });

const slides = document.querySelectorAll(".slider__item");
let current = 0;
const prev = document.querySelector(".reviews__toggle--prev");
const next = document.querySelector(".reviews__toggle--next");

function slider() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("slider__item--current");
  }
  slides[current].classList.add("slider__item--current");
}

slider();

prev.onclick = function () {
  if (current === 0) {
    current = slides.length - 1;
  } else {
    current--;
  }
  slider();
};

next.onclick = function () {
  if (current === slides.length - 1) {
    current = 0;
  } else {
    current++;
  }
  slider();
};
