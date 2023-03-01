function photographerPage(data) {
    const { name, city, country, tagline, portrait, price } = data;
  
    const picture = `img/Profils/${portrait}`;
  
    function getUserCardPage() {
      const article = document.createElement("article");
      article.className = "cardHead";
  
      const card = document.createElement("div");
      article.className = "cardName";

      const h2 = document.createElement("h2");
      h2.textContent = name;
      h2.ariaLabel = name;
      h2.className = "h2name";
  
      const location = document.createElement("h3");
      location.textContent = city + ", " + country;
      location.className = "h3city";
      location.ariaLabel = city + ", " + country;

      
      const contactMe = document.querySelector(".buttonNone");
      contactMe.classList.remove("buttonNone");

      const tag = document.createElement("p");
      tag.textContent = tagline;
      tag.className = "tag";
      tag.ariaLabel = tagline;
  
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", name);
      img.ariaLabel = "photo de " + name;
      img.className = "imguser";
  
      const photographerPrice = document.querySelector(".priceBox");
      photographerPrice.textContent = price + " € / jour";
      photographerPrice.className = "photographerPrice";
      photographerPrice.ariaLabel = price + " € / jour";

      const contactName = document.querySelector(".contactName");
      contactName.textContent = name;
      contactName.ariaLabel = name;

      card.appendChild(h2);
      card.appendChild(location);
      card.appendChild(tag);
      article.appendChild(card);
      article.appendChild(contactMe);
      article.appendChild(img);
  
      return article;
    }
    return { getUserCardPage };
  }
  