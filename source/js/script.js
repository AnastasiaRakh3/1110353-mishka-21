const nav = document.querySelector(".page-header__nav");
const navToggle = document.querySelector(".page-header__nav-toggle");

const modalWrapper = document.querySelector(".modal__wrapper");
const modalBtnPromo = document.querySelector(".modal-btn-promo");
const modalBtnsCatalog = document.querySelectorAll(".modal-btn-catalog");
const modalPromo = document.querySelector(".modal__item--promo");
const modalCatalog = document.querySelector(".modal__item--catalog");

nav.classList.remove("page-header__nav--nojs");

navToggle.addEventListener("click", function () {
  nav.classList.toggle("page-header__nav--opened");
});

if (modalBtnPromo) {
  modalBtnPromo.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalPromo.classList.add("modal__item--show");
    modalWrapper.classList.add("modal__wrapper--show");
  });

  modalWrapper.addEventListener("click", function () {
    modalWrapper.classList.remove("modal__wrapper--show");
    modalPromo.classList.remove("modal__item--show");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (modalWrapper.classList.contains("modal__wrapper--show")) {
        evt.preventDefault();
        modalWrapper.classList.remove("modal__wrapper--show");
        modalPromo.classList.remove("modal__item--show");
      }
    }
  });
}

if (modalBtnsCatalog.length) {
  for (let modalBtnCatalog of modalBtnsCatalog) {
    modalBtnCatalog.addEventListener("click", function (evt) {
      evt.preventDefault();
      modalCatalog.classList.add("modal__item--show");
      modalWrapper.classList.add("modal__wrapper--show");
    });

    modalWrapper.addEventListener("click", function () {
      modalWrapper.classList.remove("modal__wrapper--show");
      modalCatalog.classList.remove("modal__item--show");
    });

    window.addEventListener("keydown", function (evt) {
      if (evt.keyCode === 27) {
        if (modalWrapper.classList.contains("modal__wrapper--show")) {
          evt.preventDefault();
          modalWrapper.classList.remove("modal__wrapper--show");
          modalCatalog.classList.remove("modal__item--show");
        }
      }
    });
  }
}

const modalSizes = document.querySelectorAll(".modal__label");

if (modalSizes.length) {
  for (let modalSize of modalSizes) {
    modalSize.addEventListener("click", function (e) {
      e.stopPropagation();
      modalSize.classList.add("modal__label--active");

      for (let notActiveModalSizes of modalSizes) {
        if (notActiveModalSizes !== modalSize) {
          notActiveModalSizes.classList.remove("modal__label--active");
        }
      }
    });
  }
}

const slides = document.querySelectorAll(".slider__item");

if (slides.length) {
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
}
