(function() {
  var advantages = document.querySelector(".advantages");

  var firstSlideCtrl = document.querySelector(
    ".advantages__toggles  .slider__control:first-child"
  );
  var secondSlideCtrl = document.querySelector(
    ".advantages__toggles  .slider__control:nth-child(2)"
  );
  var thirdSlideCtrl = document.querySelector(
    ".advantages__toggles  .slider__control:nth-child(3)"
  );

  var firstSlide = document.querySelector(".advantages__item:first-child");
  var secondSlide = document.querySelector(".advantages__item:nth-child(2)");
  var thirdSlide = document.querySelector(".advantages__item:nth-child(3)");

  advantages.classList.remove("advantages-no-js");

  firstSlideCtrl.addEventListener("click", function(e) {
    if (secondSlideCtrl.classList.contains("slider__control--current")) {
      secondSlideCtrl.classList.remove("slider__control--current");
    }
    if (thirdSlideCtrl.classList.contains("slider__control--current")) {
      thirdSlideCtrl.classList.remove("slider__control--current");
    }
    if (!firstSlideCtrl.classList.contains("slider__control--current")) {
      firstSlideCtrl.classList.add("slider__control--current");
    }

    if (secondSlide.classList.contains("display-block")) {
      secondSlide.classList.remove("display-block");
    }

    if (thirdSlide.classList.contains("display-block")) {
      thirdSlide.classList.remove("display-block");
    }

    if (!firstSlide.classList.contains("display-block")) {
      firstSlide.classList.add("display-block");
    }
  });

  secondSlideCtrl.addEventListener("click", function(e) {
    if (firstSlideCtrl.classList.contains("slider__control--current")) {
      firstSlideCtrl.classList.remove("slider__control--current");
    }
    if (thirdSlideCtrl.classList.contains("slider__control--current")) {
      thirdSlideCtrl.classList.remove("slider__control--current");
    }
    if (!secondSlideCtrl.classList.contains("slider__control--current")) {
      secondSlideCtrl.classList.add("slider__control--current");
    }

    if (firstSlide.classList.contains("display-block")) {
      firstSlide.classList.remove("display-block");
    }

    if (thirdSlide.classList.contains("display-block")) {
      thirdSlide.classList.remove("display-block");
    }
    if (!secondSlide.classList.contains("display-block")) {
      secondSlide.classList.add("display-block");
    }
  });

  thirdSlideCtrl.addEventListener("click", function(e) {
    if (firstSlideCtrl.classList.contains("slider__control--current")) {
      firstSlideCtrl.classList.remove("slider__control--current");
    }
    if (secondSlideCtrl.classList.contains("slider__control--current")) {
      secondSlideCtrl.classList.remove("slider__control--current");
    }
    if (!thirdSlideCtrl.classList.contains("slider__control--current")) {
      thirdSlideCtrl.classList.add("slider__control--current");
    }

    if (secondSlide.classList.contains("display-block")) {
      secondSlide.classList.remove("display-block");
    }

    if (firstSlide.classList.contains("display-block")) {
      firstSlide.classList.remove("display-block");
    }
    if (!thirdSlide.classList.contains("display-block")) {
      thirdSlide.classList.add("display-block");
    }
  });
})();
