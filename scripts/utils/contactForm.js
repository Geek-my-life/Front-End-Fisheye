/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */

// elements du dom
const modalbg = document.getElementById("bground");
const contactButton = document.querySelector(".contactButton");
const body = document.querySelector(".body");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const textArea = document.getElementById("textarea");
const form = document.getElementById("form");
const regEx = /^([A-Za-z]){2,}?([-]){0,}?([A-Za-z]){0,}/;
// eslint-disable-next-line operator-linebreak
const regExMail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// fonction

// verif prénom
function checkFirst() {
  if (!firstName.value.match(regEx)) {
    // si la valeur saisie est fausse ajout d'une bordure rouge
    firstName.parentElement.setAttribute("data-error-visible", "true");
    firstName.style.border = "2px solid #e54858";
    return false;
  }
  // si la valeur saisie est bonne ajout d'une bordure verte
  firstName.parentElement.setAttribute("data-error-visible", "false");
  firstName.style.border = "solid #279e7a 0.19rem";
  return true;
}

// verif nom
function checkLast() {
  if (!lastName.value.match(regEx)) {
    // si la valeur saisie est fausse ajout d'une bordure rouge
    lastName.parentElement.setAttribute("data-error-visible", "true"); // mise en forme si error vrai
    lastName.style.border = "2px solid #e54858";
    return false;
  }
  // si la valeur saisie est bonne ajout d'une bordure verte
  lastName.parentElement.setAttribute("data-error-visible", "false"); // mise en forme si error faux
  lastName.style.border = "solid #279e7a 0.19rem";
  return true;
}

// verif mail
function checkEmail() {
  if (!email.value.match(regExMail)) {
    // si la valeur saisie est fausse ajout d'une bordure rouge
    email.parentElement.setAttribute("data-error-visible", "true");
    email.style.border = "2px solid #e54858";
    return false;
  }
  // si la valeur saisie est bonne ajout d'une bordure verte
  email.parentElement.setAttribute("data-error-visible", "false");
  email.style.border = "solid #279e7a 0.19rem";
  return true;
}

// verif message
function checkTextArea() {
  if (!textArea.value.match(regEx)) {
    // si la valeur saisie est fausse ajout d'une bordure rouge
    textArea.parentElement.setAttribute("data-error-visible", "true");
    textArea.style.border = "2px solid #e54858";
    return false;
  }
  // si la valeur saisie est bonne ajout d'une bordure verte
  textArea.parentElement.setAttribute("data-error-visible", "false");
  textArea.style.border = "solid #279e7a 0.19rem";
  return true;
}

// verif globale
function checkAll() {
  checkFirst();
  checkLast();
  checkEmail();
  checkTextArea();
}

function validForm() {
  return checkFirst() && checkLast() && checkEmail() && checkTextArea();
}

// fonction

// ouverture modal

function launchModal() {
  const name = document.querySelector(".h2name").textContent; // recherche du nom du photographe
  document.querySelector(".contactName").innerText = name; // ecriture du nom du photographe dans la modal
  modalbg.setAttribute("aria-hidden", "false"); // zone de la modal apparente
  body.classList.add("noScroll"); // ne pas pouvoir scroll l'arriere plan
  modalbg.style.display = "block"; // apparition de la modal
  firstName.focus(); // focus sur le premier element à saisir
  document.querySelectorAll(".stopFocus").forEach((element) => {
    // retirer le focus des elements en arriere plan
    element.setAttribute("tabindex", "-1");
  });
}

function launchModalKey(e) {
  const eventKey = e.key;
  // si la modal est apparente et qu'on appui sur echap
  if (modalbg.getAttribute("aria-hidden") === "false" && eventKey === "Enter") {
    const name = document.querySelector(".h2name").textContent; // recherche du nom du photographe
    document.querySelector(".contactName").innerText = name; // ecriture du nom du photographe dans la modal
    modalbg.setAttribute("aria-hidden", "false"); // zone de la modal apparente
    body.classList.add("noScroll"); // ne pas pouvoir scroll l'arriere plan
    modalbg.style.display = "block"; // apparition de la modal
    firstName.focus(); // focus sur le premier element à saisir
    document.querySelectorAll(".stopFocus").forEach((element) => {
      // retirer le focus des elements en arriere plan
      element.setAttribute("tabindex", "-1");
    });
  }
}

// fermeture modal avec la croix
function closeModal() {
  document.querySelectorAll(".stopFocus").forEach((element) => {
    // remettre le focus des elements en arriere plan
    element.setAttribute("tabindex", "0");
  });
  modalbg.setAttribute("aria-hidden", "true"); // zone de la modal invisible
  body.classList.remove("noScroll"); // remettre le scroll
  modalbg.style.display = "none"; // disparition de la modal
  contactButton.focus(); // remmetre le focus sur le bouton de contact
}

// fermeture modal avec echap
function closeModalKey(e) {
  const eventKey = e.key;
  // si la modal est apparente et qu'on appui sur echap
  if (modalbg.getAttribute("aria-hidden") === "false" && eventKey === "Escape") {
    document.querySelectorAll(".stopFocus").forEach((element) => {
      // remettre le focus des elements en arriere plan
      element.setAttribute("tabindex", "0");
    });
    modalbg.setAttribute("aria-hidden", "true"); // zone de la modal invisible
    body.classList.remove("noScroll"); // remettre le scroll
    modalbg.style.display = "none"; // disparition de la modal
    contactButton.focus(); // remmetre le focus sur le bouton de contact
  }
}

// event

// ouverture de la modal
contactButton.addEventListener("click", launchModal);
contactButton.addEventListener("keydown", launchModalKey);

// fermeture de la modal
document.querySelector(".closeModal").addEventListener("click", closeModal);
document.addEventListener("keydown", closeModalKey);

// verification prenom lors de la saisie
firstName.addEventListener("input", checkFirst);

// verification nom lors de la saisie
lastName.addEventListener("input", checkLast);

// verification mail lors de la saisie
email.addEventListener("input", checkEmail);

// verification zone de texte lors de la saisie
textArea.addEventListener("input", checkTextArea);

// envoi formulaire
function sendModal(e) {
  e.preventDefault();
  // si tout les champs sont bien saisie
  if (validForm()) {
    document.querySelectorAll(".stopFocus").forEach((element) => {
      // remettre le focus des elements en arriere plan
      element.setAttribute("tabindex", "0");
    });
    modalbg.setAttribute("aria-hidden", "true"); // zone de la modal invisible
    body.classList.remove("noScroll"); // remettre le scroll
    modalbg.style.display = "none"; // disparition de la modal
    contactButton.focus(); // remmetre le focus sur le bouton de contact
  } else {
    checkAll(); // sinon on reverifie
  }
}
form.addEventListener("submit", sendModal);
