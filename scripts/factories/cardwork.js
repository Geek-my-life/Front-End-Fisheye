function photographerWork(data) {
  const { id, photographerId, title, image, likes, date, price, video } = data;

  const picture = `img/Photos/${image}`;
  const videoMedia = `img/Photos/${video}`;

  function getWork() {
    console.log(data);
    let media;

    if(data.image){
        media = document.createElement("img");
        media.src = picture;
        media.alt = title;
        media.className = "work_img";
    } else if(data.video) {
        media = document.createElement("video");
        media.src = videoMedia;
        media.title = title;
        media.className = "work_video";
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

    const like = document.createElement("h3");
    like.textContent = likes + " ";
    like.className = "likes";
    like.ariaLabel = likes;

    const workId = document.createElement("p");
    workId.textContent = id;
    workId.className = "id_work";
    workId.ariaLabel = id;

    const photographerPageId = document.createElement("p");
    photographerPageId.textContent = photographerId;
    photographerPageId.className = "profils_id_work";
    photographerPageId.ariaLabel = photographerId;

    const dateImg = document.createElement("p");
    dateImg.textContent = date;
    dateImg.className = "date_work";
    dateImg.ariaLabel = date;

    const workPrice = document.createElement("p");
    workPrice.textContent = price;
    workPrice.className = "price_work";
    workPrice.ariaLabel = price;

    titleBlock.appendChild(titleImg);
    titleBlock.appendChild(like);
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
}
