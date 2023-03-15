/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */

// recuperation de la data
async function getPhotographers() {
  return fetch("data/photographers.json").then((response) => response.json()); // récupère les données depuis le fichier json
}

// variable pour connaitre le parametre ID de la page sur laquelle nous sommes
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const pageId = params.get("photographer");

// creation des differentes card d'en-tete des photographes en fonction de la data
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographHeader"); // localisation des card
  const filteredPhotographers = photographers.filter(
    (photographer) => photographer.id == pageId,
  );

  filteredPhotographers.forEach((photographerById) => {
    const userCardDOM = new PhotographerPage(photographerById);
    userCardDOM.article = userCardDOM.create();
    photographersSection.appendChild(userCardDOM.article);
  });
}

// creation des differentes card des réalisations des photographes en fonction de la data
async function displayMediaData(media) {
  const mediaSection = document.querySelector(".photographWork");
  mediaSection.innerHTML = "";
  const mediaOrder = document.getElementById("mySelect").value;
  const mediaById = media.filter((mediaId) => mediaId.photographerId == pageId);

  if (mediaOrder === "popularite") {
    mediaById.sort((a, b) => b.likes - a.likes);
  } else if (mediaOrder === "date") {
    mediaById.sort((a, b) => b.date - a.date);
  } else if (mediaOrder === "titre") {
    mediaById.sort((a, b) => a.title.localeCompare(b.title));
  }

  mediaById.forEach((mediaItem) => {
    const userWorkDOM = new PhotographerWork(mediaItem);
    userWorkDOM.article = userWorkDOM.create();
    mediaSection.appendChild(userWorkDOM.article);
  });
}

// mise à jour du total de like du photographe
async function updateTotalLikes() {
  const pictures = document.querySelector(".photographWork"); // localisation des likes
  const likes = pictures.querySelectorAll(".likes"); // récupération des likes
  const totalLikesNumber = document.querySelector(".totalLikesNumber"); // localisation de la box du total
  let totalLikes = 0; // total de base 0
  likes.forEach((likeBox) => {
    totalLikes += Number(likeBox.textContent);
  }); // formule box du total
  totalLikesNumber.textContent = totalLikes; // écriture du total
}

// event pour l'ajout d'un like
function like(event) {
  const target = event.currentTarget;

  if (!target.hasAttribute("liked")) {
    target.setAttribute("liked", "");
    target.querySelector(".likes").textContent = Number(target.textContent) + 1;
    updateTotalLikes();
  }
}
// mise à jour du tarif du photographe en fonction de l'id de la page
async function photographerPrice(photographers) {
  const photographerById = photographers.find(
    (photographer) => photographer.id == pageId,
  ); // filtre pour connaitre l'id
  if (!photographerById) return; // si pas d'id
  const photographersSection = document.querySelector(".priceBox"); // sinon localisation de la box
  photographersSection.innerText = `${photographerById.price}€/jour`; // mise à jour du tarif
}

async function init() {
  const { photographers, media } = await getPhotographers(); // récupère les datas des photographes
  displayData(photographers);
  displayMediaData(media);
  document
    .getElementById("mySelect")
    .addEventListener("change", () => displayMediaData(media));
  updateTotalLikes();
  photographerPrice(photographers);
}

init();
