class PhotographerPage {
  // création de la card des photographes pour leurs pages
  constructor(data) {
    // @param {string} nom du photographe
    this.name = data.name;
    // @param {string} ville du photographe
    this.city = data.city;
    // @param {string} pays du photographe
    this.country = data.country;
    // @param {string} tagline du photographe
    this.tagline = data.tagline;
    // @param {image} photo du photographe
    this.picture = `img/Profils/${data.portrait}`;
    // renvoi les card
    return this.create();
  }
  create() {
    // création de la zone de la card
    const article = document.createElement("article");
    // ajout de la class
    article.className = "cardHead";
    // création de la card en html
    article.innerHTML = `
      <div class="cardName"> 
      <h2 aria-label="${this.name}" class="h2name">${this.name}</h2>
      <h3 aria-label="${this.city} ${this.country}" class="h3city">${this.city}, ${this.country}</h3>
      <p aria-label="${this.tagline}" class="tag">${this.tagline}</p>
      </div>
      <button class="contactButton" aria-label="bouton contactez moi" role="bouton" class="stopFocus">
        Contactez-Moi
      </button>
      <img src=${this.picture} class="imguser" alt="vers la page de ${this.name}" aria-label="photo de ${this.name}"/>
      `;
    // renvoi les card
    return article;
  }
}
