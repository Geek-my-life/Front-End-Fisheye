async function getPhotographers() {
  // récupère les données depuis le fichier json
  return fetch("data/photographers.json").then((response) => response.json());
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const pageId = params.get("photographer");

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photograph-header");
  photographers
    .filter((photographer) => photographer.id == pageId)
    .forEach((photographer) => {
      const photographerModel = photographerPage(photographer);
      const userCardDOM = photographerModel.getUserCardPage();
      photographersSection.appendChild(userCardDOM);
    });
}

async function displayMediaData(medias) {
  const mediaSection = document.querySelector(".photograph-work");
  medias
    .filter((media) => media.photographerId == pageId)
    .forEach((media) => {
      const mediaModel = photographerWork(media);
      const userWorkDOM = mediaModel.getUserCardWork();
      mediaSection.appendChild(userWorkDOM);
    });
}

async function init() {
  // récupère les datas des photographes
  const {photographers, medias} = await getPhotographers();
  displayData(photographers);
  displayMediaData(medias);
}

init();
