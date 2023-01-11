const modalbg = document.querySelector(".bground");
const contactButton = document.querySelector(".contact_button");
const closeButton = document.querySelector(".close")

// lancement formulaire event
contactButton.addEventListener("click", launchModal);

// lancement formulaire
function launchModal() {
    modalbg.style.display = "block";
}

// fermeture formulaire event
closeButton.addEventListener("click", closeModal);

// fermeture formulaire
function closeModal() {
  modalbg.style.display = "none";
}