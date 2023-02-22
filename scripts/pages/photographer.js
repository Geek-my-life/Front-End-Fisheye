async function getPhotographers() {
  // récupère les données depuis le fichier json
  return fetch("data/photographers.json").then((response) => response.json());
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const pageId = params.get("photographer");

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photograph-header");
  const photographerById = photographers
    .filter((photographer) => photographer.id == pageId)
    .forEach((photographerById) => {
      const photographerModel = photographerPage(photographerById);
      const userCardDOM = photographerModel.getUserCardPage();
      photographersSection.appendChild(userCardDOM);
    });
}

async function displayMediaData(media) {
  const mediaSection = document.querySelector(".photograph-work");
  mediaSection.innerHTML = "";
  const mediaOrder = document.getElementById("mySelect").value;
  const mediaById = media
    .filter((media) => media.photographerId == pageId)
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
      const mediaModel = photographerWork(mediaById);
      const userWorkDOM = mediaModel.getUserCardWork();
      mediaSection.appendChild(userWorkDOM);
    });
}

function like(event) {
  const target = event.currentTarget;

  if (!target.hasAttribute("liked")) {
    target.setAttribute("liked", "");
    target.querySelector(".likes").textContent =
      parseInt(target.textContent) + 1;
    updateTotalLikes();
  }
}

async function updateTotalLikes() {
  const pictures = document.querySelector(".photograph-work");
  const likes = pictures.querySelectorAll(".likes");
  const totalLikesNumber = document.querySelector(".totalLikesNumber");

  let totalLikes = 0;
  likes.forEach((like) => (totalLikes += parseInt(like.textContent)));

  totalLikesNumber.textContent = totalLikes;
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
}

init();
