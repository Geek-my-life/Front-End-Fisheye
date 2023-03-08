// pour eviter d'utiliser des fonctions d'autres pages
(function () {
  // recuperation de la data
  async function getPhotographers() {
    // récupère les données depuis le fichier json
    return fetch("data/photographers.json").then((response) => response.json());
  }

  // creation des differentes card des photographes en fonction de la data
  async function displayData(photographers) {
    // localisation des card
    const photographersSection = document.querySelector(".photographerSection");
    // pour chaque photographe, création d'une card en fonction de la class PhotographerCard
    photographers.forEach((photographer) => {
      const userCardDOM = new PhotographerCard(photographer);
      photographersSection.appendChild(userCardDOM);
    });
  }

  // init
  async function init() {
    // récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
  }

  init();
})();
