class PhotographerCard {
  // création de la card des photographes
  constructor(data) {
    // @param {string} nom du photographe
    this.name = data.name;
    // @param {number} id du photographe
    this.id = data.id;
    // @param {string} ville du photographe
    this.city = data.city;
    // @param {string} pays du photographe
    this.country = data.country;
    // @param {string} tagline du photographe
    this.tagline = data.tagline;
    // @param {number} tarif du photographe
    this.price = data.price;
    // @param {image} photo du photographe
    this.picture = `img/Profils/${data.portrait}`;
    // renvoi les card */
    return this.create();
  }

  create() {
    // création de la zone de la card
    const article = document.createElement("article");
    // ajout de la class
    article.className = "cardProfils";
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
    // renvoi les card
    return article;
  }
}
