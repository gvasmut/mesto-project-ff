// template для карточек
const cardTemplate = document.querySelector("#card-template").content;

//Создание и удаление карточки, Like,
export function createCard(cardData, deleteCard, openCardPopup, likeCard) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");

  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  cardImage.addEventListener("click", () => openCardPopup(cardData));
  cardLikeBtn.addEventListener("click", likeCard);

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(evt) {
  const likeButton = evt.currentTarget;
  if (likeButton.classList.contains("card__like-button")) {
    likeButton.classList.toggle("card__like-button_is-active");
  }
}
