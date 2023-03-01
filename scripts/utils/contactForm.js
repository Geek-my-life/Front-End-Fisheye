const modalbg = document.getElementById("bground");
const contactButton = document.querySelector(".contactButton");
const body = document.querySelector(".body");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const textArea = document.getElementById("textarea");
const form = document.getElementById("form");
const regEx = /^([A-Za-z]){2,}?([-]){0,}?([A-Za-z]){0,}/;
const regExMail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// fonction

// verif prénom
function checkFirst() {
  if (!firstName.value.match(regEx)) {
    firstName.parentElement.setAttribute("data-error-visible", "true"); // mise en forme si error vrai
    firstName.style.border = "2px solid #e54858";
    return false;
  } else {
    firstName.parentElement.setAttribute("data-error-visible", "false"); // mise en forme si error faux
    firstName.style.border = "solid #279e7a 0.19rem";
    return true;
  }
}

// verif nom
function checkLast() {
  if (!lastName.value.match(regEx)) {
    lastName.parentElement.setAttribute("data-error-visible", "true"); // mise en forme si error vrai
    lastName.style.border = "2px solid #e54858";
    return false;
  } else {
    lastName.parentElement.setAttribute("data-error-visible", "false"); // mise en forme si error faux
    lastName.style.border = "solid #279e7a 0.19rem";
    return true;
  }
}

// verif mail
function checkEmail() {
  if (!email.value.match(regExMail)) {
    // verification de la regex
    email.parentElement.setAttribute("data-error-visible", "true"); // mise en forme si error vrai
    email.style.border = "2px solid #e54858";
    return false;
  } else {
    email.parentElement.setAttribute("data-error-visible", "false"); // mise en forme si error faux
    email.style.border = "solid #279e7a 0.19rem";
    return true;
  }
}

// verif message
function checkTextArea() {
  if (!textArea.value.match(regEx)) {
    textArea.parentElement.setAttribute("data-error-visible", "true"); // mise en forme si error vrai
    textArea.style.border = "2px solid #e54858";
    return false;
  } else {
    textArea.parentElement.setAttribute("data-error-visible", "false"); // mise en forme si error faux
    textArea.style.border = "solid #279e7a 0.19rem";
    return true;
  }
}

// verif globale
function checkAll() {
  checkFirst();
  checkLast();
  checkEmail();
  checkTextArea();
}

function validForm() {
  if (
    checkFirst() === true &&
    checkLast() === true &&
    checkEmail() === true &&
    checkTextArea() === true
  ) {
    return true;
  } else {
    return false;
  }
}

// event

// ouverture modal
contactButton.addEventListener("click", function () {
  modalbg.setAttribute("aria-hidden", "false");
  body.classList.add("noScroll");
  modalbg.style.display = "block";
  firstName.focus();
  document.querySelectorAll(".stopFocus").forEach((element) => {
    element.setAttribute("tabindex", "-1");
  });
  document.querySelectorAll(".mediaWork").forEach((element) => {
    element.setAttribute("tabindex", "-1");
  });
});

// fermeture modal
document.querySelector(".closeModal").addEventListener("click", function () {
  document.querySelectorAll(".stopFocus").forEach((element) => {
    element.setAttribute("tabindex", "0");
  });
  document.querySelectorAll(".mediaWork").forEach((element) => {
    element.setAttribute("tabindex", "0");
  });
  modalbg.setAttribute("aria-hidden", "true");
  body.classList.remove("noScroll");
  modalbg.style.display = "none";
  contactButton.focus();
});

// fermeture modal avec echap
document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (modalbg.getAttribute("aria-hidden") == "false" && key === "Escape") {
    document.querySelectorAll(".stopFocus").forEach((element) => {
      element.setAttribute("tabindex", "0");
    });
    document.querySelectorAll(".mediaWork").forEach((element) => {
      element.setAttribute("tabindex", "0");
    });
    modalbg.setAttribute("aria-hidden", "true");
    body.classList.remove("noScroll");
    modalbg.style.display = "none";
    contactButton.focus();;
  }
});

// verification prenom
firstName.addEventListener("input", checkFirst);

// verification nom
lastName.addEventListener("input", checkLast);

// verification mail
email.addEventListener("input", checkEmail);

// verification zone de texte
textArea.addEventListener("input", checkTextArea);

// envoi formulaire
document.querySelector(".sendButton").addEventListener("click", function (e) {
  e.preventDefault();
  if (validForm() == true) {
    document
      .querySelector(".sendButton")
      .addEventListener("click", function () {
        onCloseModal();
      });
  } else {
    checkAll();
  }
});
