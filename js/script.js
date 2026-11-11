"use strict";

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const glideStyles = document.getElementById("glide-styles");
const aosStyles = document.getElementById("aos-styles");
const autoplayToggle = document.querySelector(".autoplay-toggle");
const autoplayControl = document.querySelector(".autoplay-control");
const carouselButtons = document.querySelectorAll("[data-glide-dir]");
let carousel;
let gradient;
let autoplayPaused = motionPreference.matches;
let reducedWhenMounted = motionPreference.matches;

// Wait for a library stylesheet to load before enabling its effects.
function whenStylesReady(stylesheet, callback) {
  function enableIfLoaded() {
    try {
      if (stylesheet.sheet && stylesheet.sheet.cssRules.length > 0) {
        callback();
      }
    } catch (error) {
      // A failed stylesheet can have an unreadable sheet; keep the fallback.
    }
  }

  if (stylesheet.sheet) {
    enableIfLoaded();
  } else {
    stylesheet.addEventListener("load", enableIfLoaded, { once: true });
  }
}

function updateAutoplayButton() {
  autoplayToggle.textContent = autoplayPaused
    ? "Resume autoplay"
    : "Pause autoplay";
  autoplayToggle.setAttribute("aria-pressed", String(autoplayPaused));
}

function createCarousel(startAt, autoplay) {
  return new Glide(".glide", {
    type: "carousel",
    startAt: startAt,
    perView: 2,
    gap: 24,
    autoplay: autoplay,
    hoverpause: true,
    breakpoints: {
      719: { perView: 1, gap: 12 },
    },
  }).mount();
}

// Glide: show a responsive carousel and provide a persistent pause control.
if (typeof Glide !== "undefined" && glideStyles) {
  whenStylesReady(glideStyles, function () {
    glideStyles.media = "all";
    autoplayPaused = motionPreference.matches;
    reducedWhenMounted = motionPreference.matches;
    carousel = createCarousel(0, autoplayPaused ? false : 4500);

    carouselButtons.forEach(function (button) {
      button.hidden = false;
    });
    updateAutoplayButton();
    autoplayControl.hidden = motionPreference.matches;
  });
}

autoplayToggle.addEventListener("click", function () {
  if (!carousel || motionPreference.matches) {
    return;
  }

  if (autoplayPaused) {
    if (reducedWhenMounted) {
      // Remount with autoplay enabled after the user changes their preference.
      const currentIndex = carousel.index;
      carousel.destroy();
      carousel = createCarousel(currentIndex, 4500);
      reducedWhenMounted = false;
    } else {
      carousel.play(4500);
    }
    autoplayPaused = false;
  } else {
    carousel.pause();
    autoplayPaused = true;
  }
  updateAutoplayButton();
});

// FsLightbox: the library automatically connects the gallery's image links.
// Without it, each link still opens the original image.

// AOS: reveal sections on scroll only when motion is not reduced.
if (typeof AOS !== "undefined" && aosStyles) {
  whenStylesReady(aosStyles, function () {
    if (!motionPreference.matches) {
      aosStyles.media = "all";
      AOS.init({ duration: 750, once: true, offset: 65 });
    }
  });
}

// Granim: animate the final section; its CSS background is the static fallback.
if (typeof Granim !== "undefined" && !motionPreference.matches) {
  gradient = new Granim({
    element: "#gradient-canvas",
    direction: "diagonal",
    isPausedWhenNotInView: true,
    states: {
      "default-state": {
        gradients: [
          ["#245c67", "#6d9890"],
          ["#466d78", "#c58c78"],
          ["#2d626b", "#8ba79b"],
        ],
        transitionSpeed: 3500,
      },
    },
  });
}

// Respect a preference change without restarting animation automatically.
function handleMotionChange(event) {
  if (event.matches) {
    if (carousel) {
      carousel.pause();
      autoplayPaused = true;
      updateAutoplayButton();
    }
    autoplayControl.hidden = true;
    if (aosStyles) {
      aosStyles.media = "not all";
    }
    if (gradient) {
      gradient.destroy();
      gradient = null;
    }
  } else if (carousel) {
    autoplayControl.hidden = false;
  }
}

if (motionPreference.addEventListener) {
  motionPreference.addEventListener("change", handleMotionChange);
}
