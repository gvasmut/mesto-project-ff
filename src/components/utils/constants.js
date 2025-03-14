export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-34",
  headers: {
    authorization: "e4c827a3-d6f9-4e25-8f25-41eef98cd50d",
    "Content-Type": "application/json",
  },
};
const cardsContainer = document.querySelector(".places__list");

//Для попапов
const buttonOpenFormEditProfile = document.querySelector(".profile__edit-button");
const buttonOpenFormAddCard = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const closePopupBtns = document.querySelectorAll(".popup__close");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const popupDeleteCard = document.querySelector(".popup_type_confirm-delete");
const popupChangeAvatar = document.querySelector(".popup_type_change-aratar");
const buttonOpenFormChangeAvatar = document.querySelector(".profile__change-avatar-button");

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

export {
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
};
