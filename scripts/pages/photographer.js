// pour eviter d'utiliser des fonctions d'autres pages
(function () {
  // recuperation de la data
  async function getPhotographers() {
    // récupère les données depuis le fichier json
    return fetch("data/photographers.json").then((response) => response.json());
  }

  // variable pour connaitre le parametre ID de la page sur laquelle nous sommes
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const pageId = params.get("photographer");

  // creation des differentes card d'en-tete des photographes en fonction de la data
  async function displayData(photographers) {
    // localisation des card
    const photographersSection = document.querySelector(".photographHeader");
    // pour chaque photographe, création d'une card en fonction de l'id de la page
    const photographerById = photographers
      .filter((photographer) => photographer.id == pageId)
      .forEach((photographerById) => {
        const userCardDOM = new PhotographerPage(photographerById);
        photographersSection.appendChild(userCardDOM);
      });
  }

  // creation des differentes card des réalisations des photographes en fonction de la data
  async function displayMediaData(media) {
    // localisation des card
    const mediaSection = document.querySelector(".photographWork");
    // effacement du contenu à chaque mise à jour
    mediaSection.innerHTML = "";
    // connaitre sur quel tri on est
    const mediaOrder = document.getElementById("mySelect").value;
    // pour chaque photographe, création d'une card en fonction de l'id de la page
    const mediaById = media
      .filter((media) => media.photographerId == pageId)
      // tri en fonction de la valeur de mediaOrder
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
    // localisation des likes
    const pictures = document.querySelector(".photographWork");
    // récupération des likes
    const likes = pictures.querySelectorAll(".likes");
    // localisation de la box du total
    const totalLikesNumber = document.querySelector(".totalLikesNumber");
    // total de base 0
    let totalLikes = 0;
    // formule pour implémenter la box du total
    likes.forEach((like) => (totalLikes += parseInt(like.textContent)));
    // écriture du total
    totalLikesNumber.textContent = totalLikes;
  }

  // mise à jour du tarif du photographe en fonction de l'id de la page
  async function photographerPrice(photographers) {
    // filtre pour connaitre l'id
    const photographerById = photographers.find(
      (photographer) => photographer.id == pageId
    );
    // si pas d'id
    if (!photographerById) return;
    // sinon localisation de la box
    const photographersSection = document.querySelector(".priceBox");
    // mise à jour du tarif
    photographersSection.innerText = photographerById.price + "€/jour";
  }

  async function init() {
    // récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
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
