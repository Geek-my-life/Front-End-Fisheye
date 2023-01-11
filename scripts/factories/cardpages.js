function photographerPage(data) {
    const { name, city, country, tagline, portrait } = data;
  
    const picture = `img/Profils/${portrait}`;
  
    function getUserCardPage() {
      const article = document.createElement("article");
      article.className = "card_head";
  
      const card = document.createElement("div");
      article.className = "card_name";

      const h2 = document.createElement("h2");
      h2.textContent = name;
      h2.className = "h2name";
  
      const location = document.createElement("h3");
      location.textContent = city + ", " + country;
      location.className = "h3city";
      
      const contactMe = document.querySelector(".button_none");
      contactMe.classList.remove("button_none");

      const tag = document.createElement("p");
      tag.textContent = tagline;
      tag.className = "tag";
  
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", name);
      img.ariaLabel = name;
      img.className = "imguser";
  
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
  