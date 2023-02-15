function photographerWork(data) {
  const { id, photographerId, title, image, likes, date, price, video } = data;

  const picture = `img/Photos/${image}`;
  const videoMedia = `img/Photos/${video}`;
  const heart = `img/heart.svg`;

  function getWork() {
    let media;

    if(data.image){
        media = document.createElement("img");
        media.src = picture;
        media.alt = title;
        media.title = title;
        media.ariaLabel = title;
        media.className = "work_img work_lightbox";
    } else if(data.video) {
        media = document.createElement("video");
        media.src = videoMedia;
        media.alt = title;
        media.ariaLabel = title;
        media.title = title;
        media.className = "work_video work_lightbox";
    }
    return media;
}

  function getUserCardWork() {
    const article = document.createElement("article");
    article.className = "card_work";

    const mediaBlock = document.createElement("div");
    mediaBlock.className = "media_work";

    const media = getWork();

    const titleBlock = document.createElement("div");
    titleBlock.className = "titleBlock";

    const titleImg = document.createElement("h3");
    titleImg.textContent = title;
    titleImg.className = "title";
    titleImg.ariaLabel = title;

    const likeblock = document.createElement("div");
    likeblock.className = "likeblock";
    likeblock.setAttribute("onclick", 'like(event)');

    const like = document.createElement("h3");
    like.textContent = likes;
    like.className = "likes";
    like.ariaLabel = likes;

    const heartBlock = document.createElement("img");
    heartBlock.setAttribute("src", heart);
    heartBlock.setAttribute("alt", "like");
    heartBlock.ariaLabel = likes;
    heartBlock.className = "heart_work";

    const workId = document.createElement("p");
    workId.textContent = id;
    workId.className = "id_work";
    workId.ariaLabel = id;
    workId.style.display = "none";

    const photographerPageId = document.createElement("p");
    photographerPageId.textContent = photographerId;
    photographerPageId.className = "profils_id_work";
    photographerPageId.ariaLabel = photographerId;
    photographerPageId.style.display = "none";

    const dateImg = document.createElement("p");
    dateImg.textContent = date;
    dateImg.className = "date_work";
    dateImg.ariaLabel = date;
    dateImg.style.display = "none";

    const workPrice = document.createElement("p");
    workPrice.textContent = price;
    workPrice.className = "price_work";
    workPrice.ariaLabel = price;
    workPrice.style.display = "none";

    likeblock.appendChild(like);
    likeblock.appendChild(heartBlock);
    titleBlock.appendChild(titleImg);
    titleBlock.appendChild(likeblock);
    mediaBlock.appendChild(media);
    article.appendChild(mediaBlock);
    article.appendChild(titleBlock);
    article.appendChild(workId);
    article.appendChild(photographerPageId);
    article.appendChild(dateImg);
    article.appendChild(workPrice);

    return article;
  }
  return { getUserCardWork };
};
