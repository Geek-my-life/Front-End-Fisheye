function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `img/Profils/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.className = "card-profils";

    const linkId = document.createElement("a");
    linkId.href = `photographer.html?photographer=${id}`;
    linkId.ariaLabel = name;
    linkId.setAttribute("onkeydown", "openlink(event");
    linkId.className = "name";

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.ariaLabel = name;
    img.className = "imguser";

    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.className = "h2name";

    const location = document.createElement("h3");
    location.textContent = city + ", " + country;
    location.className = "h3city";

    const tag = document.createElement("p");
    tag.textContent = tagline;
    tag.className = "tag";

    const pricePerDay = document.createElement("p");
    pricePerDay.textContent = price + "€/jour";
    pricePerDay.className = "price";

    linkId.appendChild(img);
    linkId.appendChild(h2);
    article.appendChild(linkId);
    article.appendChild(location);
    article.appendChild(tag);
    article.appendChild(pricePerDay);

    return article;
  }
  return { getUserCardDOM };
}
