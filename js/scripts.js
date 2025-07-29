// NAV
const header = document.querySelector("header");
const navButton = document.querySelector("header button");
const main = document.querySelector("main");

function handleNav() {
  header.removeAttribute("class");
  main.removeAttribute("inert");
}

navButton.addEventListener("click", function () {
  if (header.classList.contains("nav-open")) {
    handleNav();
  } else {
    header.classList.add("nav-open");
    main.setAttribute("inert", "");
  }
});

document.addEventListener("click", function (event) {
  if (header.classList.contains("nav-open") && !header.contains(event.target)) {
    handleNav();
  }
});

document.addEventListener("keydown", function (event) {
  if (header.classList.contains("nav-open") && event.key === "Escape") {
    handleNav();
  }
});

window.addEventListener("resize", function () {
  if (header.classList.contains("nav-open") && window.innerWidth >= 834) {
    handleNav();
  }
});

window.addEventListener("scroll", function () {
  if (header.classList.contains("nav-open")) {
    handleNav();
  }
});
// ======

// PICTURE GROUPS
const inputs = document.querySelectorAll(".color-picker input");
const pictureGroups = [
  document.querySelectorAll(".gallery .picture-3"),
  document.querySelectorAll(".gallery .picture-4"),
  document.querySelectorAll(".gallery .picture-5"),
];

inputs.forEach(function (input, index) {
  input.addEventListener("change", function () {
    inputs.forEach(function (input) {
      input.removeAttribute("checked");
    });

    inputs[index].setAttribute("checked", "");

    pictureGroups.forEach(function (group) {
      group.forEach(function (picture) {
        picture.style.display = "none";
      });
    });

    pictureGroups.forEach(function (group) {
      if (group[index]) {
        group[index].removeAttribute("style");
      }
    });
  });
});
// ======

// SLIDER
const nextSlideButton = document.querySelector("#next");
const prevSlideButton = document.querySelector("#prev");
const slider = document.querySelector(".design .slider");
const slidingContainer = document.querySelector(".design .sliding-container");
const paragraphs = document.querySelectorAll(".design .slide-images-text p");
const imageCount = 3;

let isPlaying = false;
let direction = 1;
let counter = 0;
let isClicked = false;

const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    isPlaying = entry.isIntersecting ? true : false;
  });
});

slideObserver.observe(slidingContainer);

function handleSlider() {
  slider.style.transform = `translateX(-${100 * counter}%)`;
}

function handleSlideButton() {
  if (counter === 0) {
    prevSlideButton.setAttribute("disabled", "");
  } else if (counter === imageCount - 1) {
    nextSlideButton.setAttribute("disabled", "");
  } else {
    prevSlideButton.removeAttribute("disabled");
    nextSlideButton.removeAttribute("disabled");
  }
}

function handleParagraphs() {
  paragraphs.forEach(function (paragraph) {
    paragraph.style.opacity = "0";
  });
  paragraphs[counter].style.opacity = "100%";
}

function handleSlideButtonDebounce() {
  isClicked = true;
  setTimeout(function () {
    isClicked = false;
  }, 750);
}

function playAutoSlide() {
  if (isPlaying) {
    if (counter === imageCount - 1) direction = -1;
    if (counter === 0) direction = 1;
    counter += direction;

    handleSlider();
    handleSlideButton();
    handleParagraphs();
    handleSlideButtonDebounce();
  }
}

function pauseAutoSlide() {
  isPlaying = false;
  clearInterval(playAutoSlide);
}

setInterval(playAutoSlide, 3000);

nextSlideButton.addEventListener("click", function () {
  pauseAutoSlide();

  if (isClicked) return;

  counter += 1;

  handleSlider();
  handleSlideButton();
  handleParagraphs();
  handleSlideButtonDebounce();
});

prevSlideButton.addEventListener("click", function () {
  pauseAutoSlide();

  if (isClicked) return;

  counter -= 1;

  handleSlider();
  handleSlideButton();
  handleParagraphs();
  handleSlideButtonDebounce();
});
