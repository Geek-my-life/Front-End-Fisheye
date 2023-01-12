async function getPhotographers() {
  // récupère les données depuis le fichier json
  return fetch("data/photographers.json").then((response) => response.json());
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const pageId = params.get("photographer");

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photograph-header");
  const photographerById = photographers.filter((photographer) => photographer.id == pageId)
    .forEach((photographerById) => {
      const photographerModel = photographerPage(photographerById);
      const userCardDOM = photographerModel.getUserCardPage();
      photographersSection.appendChild(userCardDOM);
    });
}

async function displayMediaData(media) {
  const mediaSection = document.querySelector(".photograph-work");
  const mediaById = media.filter((media) => media.photographerId == pageId)
  .forEach((mediaById) => {
    const mediaModel = photographerWork(mediaById);
    const userWorkDOM = mediaModel.getUserCardWork();
    mediaSection.appendChild(userWorkDOM);
  });
  
}

async function init() {
  // récupère les datas des photographes
  const {photographers, media} = await getPhotographers();
  displayData(photographers);
  displayMediaData(media);
}

init();
