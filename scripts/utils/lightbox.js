const lightbox = document.getElementById("lightbox");
const pictureMedia = document.querySelectorAll(".media_work");
const close = document.querySelectorAll(".close");
const mediaAll = document.querySelectorAll(".work_lightbox");
const prevButton = document.querySelector(".fa-chevron-left");
const nextButton = document.querySelector(".fa-chevron-right");
let currentIndex = 0;

// lancement formulaire
function launchLightbox(element) {
  lightbox.style.display = "flex";
  const imageLightbox = element.querySelector(".work_lightbox");
  renderMedia(imageLightbox);
}

// lancement formulaire event
pictureMedia.forEach(function (element, i) {
  element.addEventListener("click", () => launchLightbox(element));
});

// fermeture formulaire
function closeLightbox() {
  lightbox.style.display = "none";
}

// fermeture formulaire event
close.forEach(function (element, i) {
  element.addEventListener("click", closeLightbox);
});

// affichage de la bonne lightbox
function renderMedia(media) {
  const mediaContainer = document.querySelector(".card_lightbox");
  const mediaContainerTitle = document.createElement("h4");
  mediaContainerTitle.className = "media_title";
  mediaContainerTitle.innerHTML = media.title;
  mediaContainerTitle.ariaLabel = media.title;
  const isImage = /\.(jpeg|jpg|gif|png)$/i.test(media.src);

  if (isImage) {
    mediaContainer.innerHTML = `<img src="${media.src}" class="mediaBox" />`;
  } else {
    mediaContainer.innerHTML = `<video controls><source src="${media.src}" type="video/mp4"></video>`;
  }

  mediaContainer.appendChild(mediaContainerTitle);
}

// fleche retour
function goToPrev() {
  currentIndex = (currentIndex + mediaAll.length - 1) % mediaAll.length;
  renderMedia(mediaAll[currentIndex]);
}
// event retour
prevButton.addEventListener("click", goToPrev);

// fleche suivante
function goToNext() {
  currentIndex = (currentIndex + 1) % mediaAll.length;
  renderMedia(mediaAll[currentIndex]);
}
// event suivante
nextButton.addEventListener("click", goToNext);

// retour et suivant avec les fleches du clavier
document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (key === "ArrowRight") {
    goToNext();
  } else if (key === "ArrowLeft") {
    goToPrev();
  } else if (key === "Escape") {
    closeLightbox();
  }
});
