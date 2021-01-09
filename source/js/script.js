const modalBtns = document.querySelectorAll(".modal-btn");
const modals = document.querySelectorAll(".modal");

for (const modal of modals) {
  for (const modalBtn of modalBtns) {
    modalBtn.addEventListener("click", function (evt) {
      evt.preventDefault();
      modal.classList.add("modal--show");
    });
  }
}

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
    current = slides.length - 1;;
  } else {
    current--;
  }
  slider();
};

next.onclick = function () {
  if (current === slides.length - 1) {
    current = 0; ;
  } else {
    current++;
  }
  slider();
};

