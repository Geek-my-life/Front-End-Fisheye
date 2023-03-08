// pour eviter d'utiliser des fonctions d'autres pages
(function () {
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
    } // si c'est une vidéo
    else {
      mediaContainer.innerHTML = `<video controls><source src="${media.src}" type="video/mp4"></video>`; // création de la box de la vidéo et de sa class
    }
    // création de la lightbox
    mediaContainer.appendChild(mediaContainerTitle);
  }

  // lancement formulaire
  function launchLightbox(element) {
    lightbox.style.display = "flex"; // affichage de la lightbox
    const imageLightbox = element.querySelector(".workLightbox"); // recherche du media
    renderMedia(imageLightbox); // affichage de la lightbox en fonction du media sur lequel on a cliqué
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
  }

  // event

  // lancement formulaire
  // pour chaque card, event au click ou en keydown
  document.querySelectorAll(".mediaWork").forEach(function (element, i) {
    element.addEventListener("click", () => launchLightbox(element));
    element.addEventListener("keydown", function (e) {
      const key = e.key;
      if (key === "Enter") {
        launchLightbox(element);
      }
    });
  });

  // fermeture formulaire pour chaque croix
  close.forEach(function (element, i) {
    element.addEventListener("click", closeLightbox);
  });

  // fleche aller au media précédent
  document
    .querySelector(".fa-chevron-left")
    .addEventListener("click", goToPrev);

  // fleche aller au media suivant
  document
    .querySelector(".fa-chevron-right")
    .addEventListener("click", goToNext);

  // accessibilité de la modal
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
})();
