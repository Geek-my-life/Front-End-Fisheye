const lightbox = document.getElementById("lightbox");
const pictureMedia = document.querySelectorAll(".card_work");
console.log(pictureMedia);
// lancement formulaire event

pictureMedia.forEach(function(picture) {
console.log(picture);
    picture.addEventListener('click', launchLightbox());
  });

// lancement formulaire
function launchLightbox() {
    console.log("toto");
    lightbox.style.display = "block";
};
