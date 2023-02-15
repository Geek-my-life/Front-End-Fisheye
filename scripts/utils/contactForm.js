const modalbg = document.getElementById("bground");
const contactButton = document.querySelector(".contact_button");
const closeButton = document.querySelector(".close_modal");
const sendButton = document.querySelector(".send_button");
const body = document.querySelector(".body");
const mainWrapper = document.getElementById("main");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const textArea = document.getElementById("textarea");
const form = document.getElementById("form");
const regEx = /^([A-Za-z]){2,}?([-]){0,}?([A-Za-z]){0,}/;
const regExMail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// variables pour l'accessibilité

// ouverture du modal
const onOpenModal = () => {
  mainWrapper.setAttribute('aria-hidden', 'true')
  modalbg.setAttribute('aria-hidden', 'false')
  body.classList.add('no-scroll')
  modalbg.style.display = "block"
  closeButton.focus()
};

// event d'ouverture
contactButton.addEventListener('click', function() {
  onOpenModal();
});

// fermeture du modal
const onCloseModal = () => {
  mainWrapper.setAttribute('aria-hidden', 'false')
  modalbg.setAttribute('aria-hidden', 'true')
  body.classList.remove('no-scroll')
  modalbg.style.display = "none"
  contactButton.focus()
};

// event d'ouverture
closeButton.addEventListener('click', function() {
  onCloseModal();
});

document.addEventListener('keydown', function(e) {
  const key = e.key;

  if (modalbg.getAttribute('aria-hidden') == 'false' && key === 'Escape') {
    onCloseModal();
  }
});

// verification 
firstName.addEventListener("input", checkFirst);

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

lastName.addEventListener("input", checkLast);

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
// verification mail
email.addEventListener("input", checkEmail);

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
};

textArea.addEventListener("input", checkTextArea);

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
function checkAll() {
  checkFirst();
  checkLast();
  checkEmail();
  checkTextArea();

};

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
};

// envoi formulaire
sendButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (validForm() == true) {
    sendButton.addEventListener('click', function() {
      onCloseModal();
    });
  } else {
    checkAll();
  }
});