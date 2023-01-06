function photographerPage(data) {
    const { name, city, country, tagline, portrait } = data;
  
    const picture = `img/Profils/${portrait}`;
  
    function getUserCardPage() {
      const header = document.querySelector(".photograph-header");
  
      const article = document.createElement("article");
      article.className = "card-name";
  
      const h2 = document.createElement("h2");
      h2.textContent = name;
      h2.className = "h2name";
  
      const location = document.createElement("h3");
      location.textContent = city + ", " + country;
      location.className = "h3city";
      
      const contactMe = document.createElement("button");
      contactMe.innerHTML = "Contactez-Moi";
      contactMe.className = "contact_button";

      const tag = document.createElement("p");
      tag.textContent = tagline;
      tag.className = "tag";
  
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", name);
      img.ariaLabel = name;
      img.className = "imguser";
  
      article.appendChild(h2);
      article.appendChild(location);
      article.appendChild(tag);
      header.appendChild(article);
      header.appendChild(contactMe);
      header.appendChild(img);
  
      return header;
    }
    return { getUserCardPage };
  }
  