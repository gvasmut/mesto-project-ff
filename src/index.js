import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidationErrors } from "./components/validation.js";
import { getUserInfo, getCards, sendUserData, sendCard, changeAvatarImage } from "./components/api.js";

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
const popupDeleteCard = document.querySelector(".popup_type_confirm-delete");
const popupButton = document.querySelectorAll(".popup__button");
const popupChangeAvatar = document.querySelector(".popup_type_change-aratar");
const buttonOpenFormChangeAvatar = document.querySelector(".profile__change-avatar-button");
let userId;

//Для редактирования формы
const formEditProfile = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Для добавления карточки
const formNewPlaceAdd = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

const avatarLinkInput = document.querySelector(".popup__avatar_type_url");
const formNewAvatar = document.forms["change-aratar"];

//открытие попапов
function openEditProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

//открытие попапов.редактировать профиль
buttonOpenFormEditProfile.addEventListener("click", () => {
  clearValidationErrors(editPopup, validationConfig);
  openPopup(editPopup);
  openEditProfilePopup();
});

//открытие попапов.сменить фото аватара
buttonOpenFormChangeAvatar.addEventListener("click", () => {
  clearValidationErrors(popupChangeAvatar, validationConfig);
  openPopup(popupChangeAvatar);
});

//открытие попапов.добавить место
buttonOpenFormAddCard.addEventListener("click", () => {
  clearValidationErrors(newCardPopup, validationConfig);
  openPopup(newCardPopup);
});

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

//редакртирование профиля
function submitFormEditProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  renderLoading(true);

  sendUserData(nameValue, jobValue)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cardData]) => {
    //инфа о пользователе с сервера
    userId = userInfo._id;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

    // создание карточек (с сервера )
    cardData.forEach((cardData) => {
      const cardElement = createCard(cardData, userId, popupDeleteCard, openCardPopup, likeCard);
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });

//добавление карточки новой
function handleFormAddCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  renderLoading(true);
  sendCard(cardData.name, cardData.link)
    .then((result) => {
      const newCard = createCard(result, userId, popupDeleteCard, openCardPopup, likeCard);
      cardsContainer.prepend(newCard);
      closePopup(newCardPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

//сменить аватар
function handleChangeAvatar(evt) {
  evt.preventDefault();
  const avatarUrl = avatarLinkInput.value;
  renderLoading(true);

  changeAvatarImage(avatarUrl)
    .then((result) => {
      profileImage.style.backgroundImage = `url('${result.avatar}')`;
      closePopup(popupChangeAvatar);
    })
    .catch((err) => {
      console.error("Ошибка при смене аватара:", err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

// Действия по кнопке сохранить
formEditProfile.addEventListener("submit", submitFormEditProfile);
formNewPlaceAdd.addEventListener("submit", handleFormAddCard);
formNewAvatar.addEventListener("submit", handleChangeAvatar);

// включение валидации
enableValidation(validationConfig);

//смена кнопки при загрузке на сервер
const renderLoading = (isLoading) => {
  popupButton.forEach((button) => {
    if (isLoading) {
      button.textContent = "Сохранение...";
    } else {
      button.textContent = "Сохранить";
    }
  });
};
