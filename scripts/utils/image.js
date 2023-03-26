/* eslint-disable linebreak-style */
/* eslint-disable quotes */
// eslint-disable-next-line no-unused-vars
class Image {
  // création de la card des réalisations
  constructor(data, { onLike, onSelected: onSelectedCb }) {
    this.onSelectedCb = onSelectedCb;
    this.onLike = onLike;
    this.title = data.title; // @param {string} titre du media
    this.likes = data.likes; // @param {number} nombre de like
    this.date = data.date; // @param {date} date du media
    this.picture = `img/Photos/${data.image}`; // @param {image} image du media
    this.media = `<img src=${this.picture} title="${this.title}" data-date="${this.date}" data-like="${this.likes}" class="workImg workLightbox" alt="${this.title}" aria-label="${this.title}"/>`; // @param {video} video du media
    this.heart = "img/heart.svg"; // @param {image} image du like
    this.article = this.create(); // renvoi les card
  }

  create() {
    const article = document.createElement("article"); // création de la zone de la card

    article.className = "cardWork"; // ajout de la class

    // création de la card en html
    article.innerHTML = `
      <div class="mediaWork stopFocus" tabindex="0">${this.media}</div>
      <div class="titleBlock">
         <h3 class="title" aria-label="${this.title}">${this.title}</h3>
         <div class="likeBlock stopFocus likeButton" tabindex="0">
          <h3 class="likes" aria-label="${this.likes}">${this.likes}</h3>
          <img src="${this.heart}" alt="${this.likes}" aria-label="${this.likes}" class="heartWork"/>
         </div>
      </div>`;

    // event pour l'ajout d'un like
    const like = (event) => {
      const target = event.currentTarget;

      if (!target.hasAttribute("liked")) {
        target.setAttribute("liked", "");
        target.querySelector(".likes").textContent = Number(target.textContent) + 1;
        this.onLike();
      }
    };

    // event au clic pour les like
    const likeButton = article.querySelector(".likeButton");
    likeButton.addEventListener("click", (event) => {
      like(event);
    });

    // event keydown pour les like
    likeButton.addEventListener("keydown", (event) => {
      const eventKey = event.key;
      if (eventKey === "Enter") {
        like(event);
      }
    });

    const mediaWork = article.querySelector(".mediaWork");

    // lancement lightbox
    const onSelected = () => {
      const imageLightbox = mediaWork.querySelector(".workLightbox"); // recherche du media
      this.onSelectedCb(imageLightbox); // affichage lightbox en fonction du media sur lequel clic
    };

    // pour chaque card, event au click ou en keydown
    mediaWork.addEventListener("click", onSelected);
    mediaWork.addEventListener("keydown", (e) => {
      const eventKey = e.key;
      if (eventKey === "Enter") {
        onSelected();
      }
    });

    // renvoi les card
    return article;
  }
}
