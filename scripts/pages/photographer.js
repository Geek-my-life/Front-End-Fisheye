// pour eviter d'utiliser des fonctions d'autres pages
(function () {
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
    const photographerById = photographers // pour chaque photographe, création d'une card en fonction de l'id de la page
      .filter((photographer) => photographer.id == pageId)
      .forEach((photographerById) => {
        const userCardDOM = new PhotographerPage(photographerById);
        photographersSection.appendChild(userCardDOM);
      });
  }

  // creation des differentes card des réalisations des photographes en fonction de la data
  async function displayMediaData(media) {
    const mediaSection = document.querySelector(".photographWork"); // localisation des card
    mediaSection.innerHTML = ""; // effacement du contenu à chaque mise à jour
    const mediaOrder = document.getElementById("mySelect").value; // connaitre sur quel tri on est
    const mediaById = media // pour chaque photographe, création d'une card en fonction de l'id de la page
      .filter((media) => media.photographerId == pageId) // tri en fonction de la valeur de mediaOrder
      .sort((a, b) => {
        if (mediaOrder === "popularite") {
          const aPopularite = a.likes;
          const bPopularite = b.likes;
          return bPopularite - aPopularite;
        } else if (mediaOrder === "date") {
          const aDate = a.date;
          const bDate = b.date;
          return bDate - aDate;
        } else if (mediaOrder === "titre") {
          const aTitle = a.title;
          const bTitle = b.title;
          if (aTitle < bTitle) return -1;
          if (aTitle > bTitle) return 1;
          return 0;
        }
      })
      .forEach((mediaById) => {
        const userWorkDOM = new PhotographerWork(mediaById);
        mediaSection.appendChild(userWorkDOM);
      });
  }

  // event pour l'ajout d'un like
  function like(event) {
    const target = event.currentTarget;

    if (!target.hasAttribute("liked")) {
      target.setAttribute("liked", "");
      target.querySelector(".likes").textContent =
        parseInt(target.textContent) + 1;
      updateTotalLikes();
    }
  }

  // mise à jour du total de like du photographe
  async function updateTotalLikes() {
    const pictures = document.querySelector(".photographWork"); // localisation des likes
    const likes = pictures.querySelectorAll(".likes"); // récupération des likes
    const totalLikesNumber = document.querySelector(".totalLikesNumber"); // localisation de la box du total
    let totalLikes = 0; // total de base 0
    likes.forEach((like) => (totalLikes += parseInt(like.textContent))); // formule pour implémenter la box du total
    totalLikesNumber.textContent = totalLikes; // écriture du total
  }

  // mise à jour du tarif du photographe en fonction de l'id de la page
  async function photographerPrice(photographers) {
    const photographerById = photographers.find(
      (photographer) => photographer.id == pageId
    ); // filtre pour connaitre l'id
    if (!photographerById) return; // si pas d'id
    const photographersSection = document.querySelector(".priceBox"); // sinon localisation de la box
    photographersSection.innerText = photographerById.price + "€/jour"; // mise à jour du tarif
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
})();
