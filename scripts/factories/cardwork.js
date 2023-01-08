function photographerWork(data) {
    const { id, photographerId, title, image, likes, date, price } = data;

    const picture = `img/Profils/${image}`;

    function getUserCardWork() {
        
      const article = document.createElement("article");
      article.className = "card_work";
  
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", image);
      img.ariaLabel = image;
      img.className = "card_work_img";

      const titleBlock = document.createElement("div");
      titleBlock.className = "titleBlock";
  
      const titleImg = document.createElement("h3");
      titleImg.textContent = title;
      titleImg.className = "title";
      titleImg.ariaLabel = title;
      
      const like = document.createElement("h3");
      like.textContent = likes +" ";
      like.className = "likes";
      like.ariaLabel = likes;

      const workId = document.createElement("p");
      workId.textContent = id;
      workId.className = "id_work";
      workId.ariaLabel = id;

      const photographerPageId = document.createElement("p");
      photographerPageId.textContent = photographerId;
      photographerPageId.className = "id_work";
      photographerPageId.ariaLabel = photographerId;

      const dateImg = document.createElement("p");
      dateImg.textContent = date;
      dateImg.className = "date_work";
      dateImg.ariaLabel = date;

      const workPrice = document.createElement("p");
      workPrice.textContent = price;
      workPrice.className = "price_work";
      workPrice.ariaLabel = price;

      titleBlock.appendChild(title);
      titleBlock.appendChild(like);
      article.appendChild(img);
      article.appendChild(titleBlock);
      article.appendChild(workId);
      article.appendChild(photographerPageId);
      article.appendChild(dateImg);
      article.appendChild(workPrice);

      return article;
    }
    return { getUserCardWork };
  }
  