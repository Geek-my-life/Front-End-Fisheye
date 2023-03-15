/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */

// recuperation de la data
async function getPhotographers() {
  return fetch("data/photographers.json").then((response) => response.json()); // récupère les données depuis le fichier json
}
// creation des differentes card des photographes en fonction de la data
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographerSection");
  const promises = photographers.map((photographer) => {
    // eslint-disable-next-line no-undef
    const userCardDOM = new PhotographerCard(photographer);
    return userCardDOM.article; // on retourne l'article créé
  });
  const articles = await Promise.all(promises); // résolution promesses de création de cartes
  articles.forEach((article) => {
    photographersSection.appendChild(article);
  });
}

// init
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers); // récupère les datas des photographes
}

init();
