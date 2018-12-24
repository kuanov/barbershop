(function() {
  var loginLink = document.querySelector(".user-navigation__login");
  var modalLogin = document.querySelector(".modal-login");
  var pageOverlay = document.querySelector(".modal-overlay");
  var modalLoginClose = document.querySelector(".modal-login__close");

  loginLink.addEventListener("click", function(e) {
    e.preventDefault();

    pageOverlay.classList.add("display-block");
    modalLogin.classList.add("display-block");
  });

  modalLoginClose.addEventListener("click", function(e) {
    e.preventDefault();

    pageOverlay.classList.remove("display-block");
    modalLogin.classList.remove("display-block");
  });
})();
