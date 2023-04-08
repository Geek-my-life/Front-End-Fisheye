/* eslint-disable linebreak-style */ // retire le style de retour à la ligne
/* eslint-disable comma-dangle */ // retire la virgule
/* eslint-disable quotes */ // retire l'obligation de mettre des ''
/* eslint-disable eqeqeq */ // retire les ===

// recuperation de la data
async function getPhotographers() {
  return fetch("data/photographers.json").then((response) => response.json()); // récupère les données depuis le fichier json
}

// variable pour connaitre le parametre ID de la page sur laquelle nous sommes
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const pageId = params.get("photographer");

// eslint-disable-next-line no-undef
const lightbox = new Lightbox();
// eslint-disable-next-line no-undef
const contactForm = new ContactForm();

// creation des differentes card d'en-tete des photographes en fonction de la data
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographHeader"); // localisation des card
  const filteredPhotographers = photographers.filter(
    (photographer) => photographer.id == pageId // filtre en fonction de l'id de la page
  );

  filteredPhotographers.forEach((photographerById) => {
    // eslint-disable-next-line no-undef
    const userCardDOM = new PhotographerPage(photographerById, {
      // création de la card
      onSelected: () => {
        contactForm.open();
      },
    });
    userCardDOM.article = userCardDOM.create();
    photographersSection.appendChild(userCardDOM.article);
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

// creation des differentes card des réalisations des photographes en fonction de la data
async function displayCardData(card) {
  const mediaSection = document.querySelector(".photographWork");
  mediaSection.innerHTML = "";
  const mediaOrder = document.getElementById("mySelect").value; // valeur de la sélection
  // filtre en fonction de l'id de la page
  const cardsById = card.filter((cardId) => cardId.photographerId == pageId);
  // tri en fonction de popularite
  if (mediaOrder === "popularite") {
    cardsById.sort((a, b) => b.likes - a.likes);
  }

  cardsById.forEach((cardId) => {
    // eslint-disable-next-line no-undef, max-len
    const userWorkDOM = new PhotographerWork(cardId, {
      // MediaFactory.createMedia
      onLike: updateTotalLikes,
      onSelected: (media) => {
        lightbox.open();
        lightbox.renderMedia(media);
      },
    });
    mediaSection.appendChild(userWorkDOM.article);
  });
}

function order(cardData) {
  // fonction de tri
  const photographWork = document.querySelector(".photographWork"); // div des réalisations
  const cardsDataById = cardData.filter(
    (cardId) => cardId.photographerId == pageId // filtre en fonction de l'id du photographe
  );
  const mediaOrder = document.getElementById("mySelect").value; // valeur de la sélection

  if (mediaOrder === "popularite") {
    cardsDataById.sort((a, b) => b.likes - a.likes); // tri en fonction de popularite
  } else if (mediaOrder === "date") {
    cardsDataById.sort((a, b) => b.date - a.date); // tri en fonction de la date
  } else if (mediaOrder === "titre") {
    cardsDataById.sort((a, b) => a.title.localeCompare(b.title)); // tri en fonction du titre
  }

  const sortedCardsId = cardsDataById.map((card) => card.id);

  [...photographWork.children] // création d'un tableau des réalisations
    // eslint-disable-next-line operator-linebreak
    .sort(
      // eslint-disable-next-line max-len
      (a, b) => sortedCardsId.indexOf(parseInt(a.id, 10)) - sortedCardsId.indexOf(parseInt(b.id, 10))
    )
    .forEach((node) => {
      photographWork.appendChild(node);
    });
}

// mise à jour du tarif du photographe en fonction de l'id de la page
async function photographerPrice(photographers) {
  const photographerById = photographers.find(
    (photographer) => photographer.id == pageId
  ); // filtre pour connaitre l'id
  if (!photographerById) return; // si pas d'id
  const photographersSection = document.querySelector(".priceBox"); // sinon localisation de la box
  photographersSection.innerText = `${photographerById.price}€/jour`; // mise à jour du tarif
}

async function init() {
  const { photographers, media } = await getPhotographers(); // récupère les datas des photographes
  displayData(photographers);
  displayCardData(media);
  document
    .getElementById("mySelect")
    .addEventListener("change", () => order(media)); // event sur le changement de tri
  updateTotalLikes();
  photographerPrice(photographers);
}

init();
