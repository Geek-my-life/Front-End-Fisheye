/* eslint-disable linebreak-style */ // retire le style de retour à la ligne
/* eslint-disable quotes */ // retire l'obligation de mettre des ''

// eslint-disable-next-line no-unused-vars
class PhotographerCard {
  // création de la card des photographes
  constructor(data) {
    this.name = data.name; // @param {string} nom du photographe
    this.id = data.id; // @param {number} id du photographe
    this.city = data.city; // @param {string} ville du photographe
    this.country = data.country; // @param {string} pays du photographe
    this.tagline = data.tagline; // @param {string} tagline du photographe
    this.price = data.price; // @param {number} tarif du photographe
    this.picture = `img/Profils/${data.portrait}`; // @param {image} photo du photographe
    this.article = this.create(); // renvoi les card
  }

  create() {
    const article = document.createElement("article"); // création de la zone de la card
    article.className = "cardProfils"; // ajout de la class
    // création de la card en html
    article.innerHTML = ` 
    <a href= "photographer.html?photographer=${this.id}" aria-label="lien vers ${this.name}" class="name" tabindex="0" onkeydown="openlink(event)">
      <img src=${this.picture} class="imguser" alt="vers la page de ${this.name}" aria-label="photo de ${this.name}"/>
      <h2 aria-label="${this.name}" class="h2name">${this.name}</h2>
      <h3 aria-label="${this.city} ${this.country}" class="h3city">
        ${this.city}, ${this.country}
      </h3>
      <p aria-label="${this.tagline}" class="tag">${this.tagline}</p>
      <p aria-label="${this.price}€/jour" class="price">${this.price}€/jour</p>
    </a>`;
    return article; // renvoi les card
  }
}
