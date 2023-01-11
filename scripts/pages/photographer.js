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

async function displayMediaData(media) {
  const mediaSection = document.querySelector(".photograph-work");
  const mediaById = media.filter(function(el){
    return el.photographerId == pageId;
  });
  const mediaModel = photographerWork(mediaById);
  const userWorkDOM = mediaModel.getUserCardWork();
  mediaSection.appendChild(userWorkDOM);
}

async function init() {
  // récupère les datas des photographes
  const {photographers, media} = await getPhotographers();
  displayData(photographers);
  displayMediaData(media);
}

init();
