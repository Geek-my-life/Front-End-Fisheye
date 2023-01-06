async function getPhotographers() {
  // récupère les données depuis le fichier json
  return fetch("data/photographers.json").then((response) => response.json());
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photograph-header");
  photographers.forEach((photographer) => {
    const photographerModel = photographerPage(photographer);
    const userCardDOM = photographerModel.getUserCardPage();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
