import "./pages/index.css";
import { createCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidationErrors } from "./components/validation.js";
import { getUserInfo, getCards, sendUserData, sendCard, changeAvatarImage } from "./components/api.js";
import { handleSubmit } from "./components/utils/utilits";
import {
  cardsContainer,
  buttonOpenFormEditProfile,
  buttonOpenFormAddCard,
  editPopup,
  newCardPopup,
  imagePopup,
  closePopupBtns,
  popupImage,
  popupCaption,
  popupDeleteCard,
  popupChangeAvatar,
  buttonOpenFormChangeAvatar,
  formEditProfile,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
  profileImage,
  validationConfig,
  formNewPlaceAdd,
  cardNameInput,
  cardLinkInput,
  avatarLinkInput,
  formNewAvatar,
} from "./components/utils/constants";
let userId;

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
closePopupBtns.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});

//редакртирование профиля
function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return sendUserData(nameInput.value, jobInput.value).then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
    });
  }
  handleSubmit(makeRequest, evt);
}

//добавление карточки новой
function handleFormAddCard(evt) {
  function makeRequest() {
    const cardData = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    };
    return sendCard(cardData).then((request) => {
      const newCard = {
        cardData: request,
        userId,
        popupDeleteCard,
        openCardPopup,
        likeCard,
      };
      renderCard(newCard);
    });
  }
  handleSubmit(makeRequest, evt, "Создание...");
}

//функция для вставки карточки
function renderCard(item, method = "prepend") {
  const cardElement = createCard(item);
  cardsContainer[method](cardElement);
}

//сменить аватар
function handleChangeAvatar(evt) {
  function makeRequest() {
    const avatarUrl = avatarLinkInput.value;
    return changeAvatarImage(avatarUrl).then((result) => {
      profileImage.style.backgroundImage = `url('${result.avatar}')`;
    });
  }
  handleSubmit(makeRequest, evt);
}

// Действия по кнопке сохранить
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPlaceAdd.addEventListener("submit", handleFormAddCard);
formNewAvatar.addEventListener("submit", handleChangeAvatar);

Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cardData]) => {
    //инфа о пользователе с сервера
    userId = userInfo._id;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

    // создание карточек (с сервера )
    cardData.forEach((cardData) => {
      const cardElement = createCard({ cardData, userId, popupDeleteCard, openCardPopup, likeCard });
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });

// включение валидации
enableValidation(validationConfig);
