const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  cardsContainer.append(cardElement);
});
