/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */

// element du dom
const lightbox = document.getElementById("lightbox");
const close = document.querySelectorAll(".close");
const mediaAll = document.querySelectorAll(".workLightbox");
let currentIndex = 0;

// fonction

// affichage de la bonne lightbox
function renderMedia(media) {
  const mediaContainer = document.querySelector(".cardLightbox"); // localisation de la lightbox
  const mediaContainerTitle = document.createElement("h4"); // création du titre
  mediaContainerTitle.className = "mediaTitle"; // ajout de la class au titre
  mediaContainerTitle.innerHTML = media.title; // écriture du titre
  mediaContainerTitle.ariaLabel = media.title; // accessibilité du titre
  const isImage = /\.(jpeg|jpg|gif|png)$/i.test(media.src); // verification que ce soit une image
  if (isImage) {
    // si c'est une image
    mediaContainer.innerHTML = `<img src="${media.src}" class="mediaBox" />`; // création de la box de l'image et de sa class
    // si c'est une vidéo
  } else {
    mediaContainer.innerHTML = `<video controls><source src="${media.src}" type="video/mp4"></video>`; // création de la box de la vidéo et de sa class
  }
  // création de la lightbox
  mediaContainer.appendChild(mediaContainerTitle);
}

// lancement formulaire
function launchLightbox(element) {
  lightbox.style.display = "flex"; // affichage de la lightbox
  const imageLightbox = element.querySelector(".workLightbox"); // recherche du media
  renderMedia(imageLightbox); // affichage de la lightbox en fonction du media sur lequel on a clic
  document.querySelectorAll(".stopFocus").forEach((item) => {
    // retirer le focus des elements en arriere plan
    item.setAttribute("tabindex", "-1");
  });
}

// fleche retour
function goToPrev() {
  currentIndex = (currentIndex + mediaAll.length - 1) % mediaAll.length;
  renderMedia(mediaAll[currentIndex]);
}

// fleche suivante
function goToNext() {
  currentIndex = (currentIndex + 1) % mediaAll.length;
  renderMedia(mediaAll[currentIndex]);
}

// fermeture formulaire
function closeLightbox() {
  lightbox.style.display = "none"; // retire la lightbox
  document.querySelectorAll(".stopFocus").forEach((item) => {
    // retirer le focus des elements en arriere plan
    item.setAttribute("tabindex", "0");
  });
}

// event

// lancement lightbox

// pour chaque card, event au click ou en keydown
document.querySelectorAll(".mediaWork").forEach((element) => {
  element.addEventListener("click", () => launchLightbox(element));
  element.addEventListener("keydown", (e) => {
    const eventKey = e.key;
    if (eventKey === "Enter") {
      launchLightbox(element);
    }
  });
});

// fermeture formulaire pour chaque croix
close.forEach((element) => {
  element.addEventListener("click", closeLightbox);
});

// fleche aller au media précédent
document.querySelector(".fa-chevron-left").addEventListener("click", goToPrev);

// fleche aller au media suivant
document.querySelector(".fa-chevron-right").addEventListener("click", goToNext);

// accessibilité de la modal
document.addEventListener("keydown", (e) => {
  const eventKey = e.key;
  if (eventKey === "ArrowRight") {
    goToNext();
  } else if (eventKey === "ArrowLeft") {
    goToPrev();
  } else if (eventKey === "Escape") {
    closeLightbox();
  }
});
