const lightbox = document.getElementById("lightbox");
const close = document.querySelectorAll(".close");
const mediaAll = document.querySelectorAll(".workLightbox");
let currentIndex = 0;

// fonction

// lancement formulaire
function launchLightbox(element) {
  lightbox.style.display = "flex";
  const imageLightbox = element.querySelector(".workLightbox");
  renderMedia(imageLightbox);
}

// fermeture formulaire
function closeLightbox() {
  lightbox.style.display = "none";
}

// affichage de la bonne lightbox
function renderMedia(media) {
  const mediaContainer = document.querySelector(".cardLightbox");
  const mediaContainerTitle = document.createElement("h4");
  mediaContainerTitle.className = "mediaTitle";
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

// fleche suivante
function goToNext() {
  currentIndex = (currentIndex + 1) % mediaAll.length;
  renderMedia(mediaAll[currentIndex]);
}

// event

// lancement formulaire
document.querySelectorAll(".mediaWork").forEach(function (element, i) {
  element.addEventListener("click", () => launchLightbox(element));
  element.addEventListener("keydown", function (e) {
    const key = e.key;
    if (key === "Enter") {
      launchLightbox(element);
    }
  });
});

// fermeture formulaire
close.forEach(function (element, i) {
  element.addEventListener("click", closeLightbox);
});

// fleche retour
document.querySelector(".fa-chevron-left").addEventListener("click", goToPrev);

// fleche suivante
document.querySelector(".fa-chevron-right").addEventListener("click", goToNext);

// retour suivant et fermer avec les fleches du clavier
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
