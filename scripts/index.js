// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function addCard(cardData) {
  let cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  return cardElement;
}

initialCards.forEach((cardData) => {
  cardElement = addCard(cardData);
  cardsList.append(cardElement);
});
