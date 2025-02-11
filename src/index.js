import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closedPopup } from "./components/modal.js";

const cardsContainer = document.querySelector(".places__list");

//Для попапов
const edditBtn = document.querySelector(".profile__edit-button");
const addProfileBtn = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const closedPopupBtn = document.querySelectorAll(".popup__close");

//Для редактирования формы
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

//Для добавления карточки
const formNewPlaceAdd = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

//создание карточек
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, openCardPopup, likeCard);
  cardsContainer.append(cardElement);
});

//открытие попапов
edditBtn.addEventListener("click", () => openPopup(editPopup));
addProfileBtn.addEventListener("click", () => openPopup(newCardPopup));

//открытие фото
function openCardPopup(cardData) {
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");
  popupImage.src = cardData.link;
  popupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

//закрытие попапа
closedPopupBtn.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closedPopup(popup);
  });
});

//редакртирование формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const profileTitle = document.querySelector(".profile__title");
  const pofileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = nameValue;
  pofileDescription.textContent = jobValue;
}

//добавление карточки
function handleFormAddCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const newCard = createCard(cardData, deleteCard, openCardPopup);
  cardsContainer.prepend(newCard);
}

formElement.addEventListener("submit", handleFormSubmit);
formNewPlaceAdd.addEventListener("submit", handleFormAddCard);
