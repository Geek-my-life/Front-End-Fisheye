class PhotographerWork {
  // création de la card des réalisations
  constructor(data) {
    // @param {string} titre du media
    this.title = data.title;
    // @param {number} nombre de like
    this.likes = data.likes;
    // @param {date} date du media
    this.date = data.date;
    // @param {image} image du media
    this.picture = `img/Photos/${data.image}`;
    // @param {video} video du media
    this.video = `img/Photos/${data.video}`;
    // @param {image} image du like
    this.heart = `img/heart.svg`;
    // validation que c'est bien une video
    this.isVideo = !!data.video;
    // renvoi les card
    return this.create();
  }

  create() {
    // variable de création en fonction d'une image ou d'une vidéo
    let media;
    // si c'est une vidéo
    if (this.isVideo) {
      media = `<video src=${this.video} title="${this.title}" data-date="${this.date}" data-like="${this.likes}" class="workVideo workLightbox" alt="${this.title}" aria-label="${this.title}"/>`;
    }
    // sinon les images
    else {
      media = `<img src=${this.picture} title="${this.title}" data-date="${this.date}" data-like="${this.likes}" class="workImg workLightbox" alt="${this.title}" aria-label="${this.title}"/>`;
    }
    // création de la zone de la card
    const article = document.createElement("article");
    // ajout de la class
    article.className = "cardWork";
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
