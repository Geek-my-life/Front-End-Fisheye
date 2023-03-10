// pour eviter d'utiliser des fonctions d'autres pages
(function () {
  // recuperation de la data
  async function getPhotographers() {
    return fetch("data/photographers.json").then((response) => response.json()); // récupère les données depuis le fichier json
  }

  // creation des differentes card des photographes en fonction de la data
  async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographerSection"); // localisation des card
    // pour chaque photographe, création d'une card en fonction de la class PhotographerCard
    photographers.forEach((photographer) => {
      const userCardDOM = new PhotographerCard(photographer);
      photographersSection.appendChild(userCardDOM);
    });
  }

  // init
  async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers); // récupère les datas des photographes
  }

  init();
})();
