/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */

class PhotographerWork {
  // création de la card des réalisations
  constructor(data) {
    this.title = data.title; // @param {string} titre du media
    this.likes = data.likes; // @param {number} nombre de like
    this.date = data.date; // @param {date} date du media
    this.picture = `img/Photos/${data.image}`; // @param {image} image du media
    this.video = `img/Photos/${data.video}`; // @param {video} video du media
    this.heart = "img/heart.svg"; // @param {image} image du like
    this.isVideo = !!data.video; // validation que c'est bien une video
    this.article = this.create(); // renvoi les card
  }

  create() {
    let media; // variable de création en fonction d'une image ou d'une vidéo
    // si c'est une vidéo
    if (this.isVideo) {
      media = `<video src=${this.video} title="${this.title}" data-date="${this.date}" data-like="${this.likes}" class="workVideo workLightbox" alt="${this.title}" aria-label="${this.title}"/>`;
      // sinon les images
    } else {
      media = `<img src=${this.picture} title="${this.title}" data-date="${this.date}" data-like="${this.likes}" class="workImg workLightbox" alt="${this.title}" aria-label="${this.title}"/>`;
    }

    const article = document.createElement("article"); // création de la zone de la card

    article.className = "cardWork"; // ajout de la class
    // création de la card en html
    article.innerHTML = `
    <div class="mediaWork stopFocus" tabindex="0">${media}</div>
    <div class="titleBlock">
       <h3 class="title" aria-label="${this.title}">${this.title}</h3>
       <div class="likeBlock" onclick="like(event)">
        <h3 class="likes" aria-label="${this.likes}">${this.likes}</h3>
        <img src="${this.heart}" alt="${this.likes}" aria-label="${this.likes}" class="heartWork"/>
       </div>
    </div>`;
    // renvoi les card
    return article;
  }
}
