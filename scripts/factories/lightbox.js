/* eslint-disable linebreak-style */
/* eslint-disable quotes */
// eslint-disable-next-line no-unused-vars
class Lightbox {
  constructor() {
    this.lightbox = document.getElementById("lightbox");
    this.closeButtons = document.querySelectorAll(".close");
    this.mediaContainer = document.querySelector(".cardLightbox"); // localisation de la lightbox
    this.currentIndex = 0;
    this.create();
  }

  create() {
    // fermeture formulaire pour chaque croix
    this.closeButtons.forEach((element) => {
      element.addEventListener("click", () => {
        this.close();
      });
    });

    this.closeButtons.forEach((element) => {
      element.addEventListener("keydown", (e) => {
        const eventKey = e.key;
        if (eventKey === "Enter") {
          this.close();
        }
      });
    });

    // fleche aller au media précédent
    this.lightbox
      .querySelector(".fa-chevron-left")
      .addEventListener("click", () => {
        this.goToPrev();
      });

    this.lightbox
      .querySelector(".fa-chevron-left")
      .addEventListener("keydown", (e) => {
        const eventKey = e.key;
        if (eventKey === "Enter") {
          this.goToPrev();
        }
      });

    // fleche aller au media suivant
    this.lightbox
      .querySelector(".fa-chevron-right")
      .addEventListener("click", () => {
        this.goToNext();
      });

    this.lightbox
      .querySelector(".fa-chevron-right")
      .addEventListener("keydown", (e) => {
        const eventKey = e.key;
        if (eventKey === "Enter") {
          this.goToNext();
        }
      });

    // accessibilité de la modal
    this.lightbox.addEventListener("keydown", (e) => {
      const eventKey = e.key;
      if (eventKey === "ArrowRight") {
        this.goToNext();
      } else if (eventKey === "ArrowLeft") {
        this.goToPrev();
      } else if (eventKey === "Escape") {
        this.close();
      }
    });
  }

  renderMedia(media) {
    const mediaContainerTitle = document.createElement("h4"); // création du titre
    mediaContainerTitle.className = "mediaTitle"; // ajout de la class au titre
    mediaContainerTitle.innerHTML = media.title; // écriture du titre
    mediaContainerTitle.ariaLabel = media.title; // accessibilité du titre
    const isImage = /\.(jpeg|jpg|gif|png)$/i.test(media.src); // verification que ce soit une image
    if (isImage) {
      // si c'est une image
      this.mediaContainer.innerHTML = `<img src="${media.src}" class="mediaBox" />`; // création de la box de l'image et de sa class
      // si c'est une vidéo
    } else {
      this.mediaContainer.innerHTML = `<video controls><source src="${media.src}" type="video/mp4"></video>`; // création de la box de la vidéo et de sa class
    }
    // création de la lightbox
    this.mediaContainer.appendChild(mediaContainerTitle);
  }

  // fleche retour
  goToPrev() {
    const mediaAll = document.querySelectorAll(".workLightbox");
    this.currentIndex = (this.currentIndex + mediaAll.length - 1) % mediaAll.length;
    this.renderMedia(mediaAll[this.currentIndex]);
  }

  // fleche suivante
  goToNext() {
    const mediaAll = document.querySelectorAll(".workLightbox");
    this.currentIndex = (this.currentIndex + 1) % mediaAll.length;
    this.renderMedia(mediaAll[this.currentIndex]);
  }

  // fermeture formulaire
  close() {
    this.lightbox.style.display = "none"; // retire la lightbox
    document.querySelectorAll(".stopFocus").forEach((item) => {
      // retirer le focus des elements en arriere plan
      item.setAttribute("tabindex", "0");
    });
  }

  open() {
    this.lightbox.style.display = "flex"; // affichage de la lightbox
    document.querySelectorAll(".stopFocus").forEach((item) => {
      // retirer le focus des elements en arriere plan
      item.setAttribute("tabindex", "-1");
    });
    this.lightbox.setAttribute = ("tabindex", "0");
    this.lightbox.focus();
  }
}
