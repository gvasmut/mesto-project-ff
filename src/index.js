import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const cardsContainer = document.querySelector(".places__list");

//Для попапов
const buttonOpenFormEditProfile = document.querySelector(".profile__edit-button");
const buttonOpenFormAddCard = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const closePopupBtn = document.querySelectorAll(".popup__close");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

//Для редактирования формы
const formEditProfile = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

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
function openEditProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}
buttonOpenFormEditProfile.addEventListener("click", () => {
  openPopup(editPopup);
  openEditProfilePopup();
});

buttonOpenFormAddCard.addEventListener("click", () => openPopup(newCardPopup));

//открытие фото
function openCardPopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

//закрытие попапа
closePopupBtn.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});

//редакртирование формы
function submitFormEditProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopup(editPopup);
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

  closePopup(newCardPopup);
  evt.target.reset();
}

formEditProfile.addEventListener("submit", submitFormEditProfile);
formNewPlaceAdd.addEventListener("submit", handleFormAddCard);
