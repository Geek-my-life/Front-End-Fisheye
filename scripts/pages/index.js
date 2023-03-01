async function getPhotographers() {
  // récupère les données depuis le fichier json
  return fetch("data/photographers.json")
  .then((response) => response.json());
};

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographerSection");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};


async function init() {
  // récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
};


init();
