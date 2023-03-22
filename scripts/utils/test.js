/* eslint-disable linebreak-style */
/* eslint-disable quotes */
class Lightbox {
  constructor(data) {
    this.lightbox = document.getElementById("lightbox");
    this.close = document.querySelectorAll(".close");
    this.mediaAll = document.querySelectorAll(".workLightbox");
    this.currentIndex = 0;
  }

  renderMedia(media) {
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

  // fleche retour
  goToPrev() {
    this.currentIndex = (this.currentIndex + this.mediaAll.length - 1) % this.mediaAll.length;
    this.renderMedia(this.mediaAll[this.currentIndex]);
  }

  // fleche suivante
  goToNext() {
    this.currentIndex = (this.currentIndex + 1) % this.mediaAll.length;
    this.renderMedia(this.mediaAll[this.currentIndex]);
  }

  // fermeture formulaire
  close() {
    this.lightbox.style.display = "none"; // retire la lightbox
  }

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
}
