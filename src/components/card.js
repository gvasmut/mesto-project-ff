import { openPopup, closePopup } from "./modal";
import { deleteCard, putLikeCard, deleteLikeCard } from "./api";

// template для карточек
const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

//клонирование шаблона
function getCardTemplate() {
  return cardTemplate.cloneNode(true);
}

//Создание и удаление карточки, Like,
export function createCard({ cardData, userId, popupDeleteCard, openCardPopup, likeCard }) {
  const cardElement = getCardTemplate();
  const cardImage = cardElement.querySelector(".card__image");
  const likeCounter = cardElement.querySelector(".like_counter");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");

  // удаление карточки, созданной текущим пользователем
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      popupDeleteCard.querySelector(".popup__button").replaceWith(popupDeleteCard.querySelector(".popup__button").cloneNode(true));
      const confirmDeleteButton = popupDeleteCard.querySelector(".popup__button");
      confirmDeleteButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        deleteCard(cardData._id)
          .then((result) => {
            cardElement.remove();
            closePopup(popupDeleteCard);
          })
          .catch((err) => {
            console.error("Ошибка при удалении карточки:", err);
          });
      });
      openPopup(popupDeleteCard);
    });
  }

  cardImage.addEventListener("click", () => openCardPopup(cardData, cardData._id));

  // Like от текущего пользователя?
  const isLikedByUser = cardData.likes.some((like) => like._id === userId);
  if (isLikedByUser) {
    cardLikeBtn.classList.add("card__like-button_is-active");
  }

  // поставить-удалить лайк
  cardLikeBtn.addEventListener("click", (evt) => {
    likeCard(evt);
    const isLiked = evt.currentTarget.classList.contains("card__like-button_is-active");
    if (isLiked) {
      putLikeCard(cardData._id)
        .then((res) => {
          likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.error("Ошибка при like карточки:", err);
        });
    } else {
      deleteLikeCard(cardData._id)
        .then((res) => {
          likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.error("Ошибка при dislike карточки:", err);
        });
    }
  });

  // вывод кол-ва лайков
  if (cardData.likes.length > 0) {
    likeCounter.textContent = cardData.likes.length;
  } else {
    likeCounter.textContent = "";
  }
  return cardElement;
}

export function likeCard(evt) {
  const likeButton = evt.currentTarget;
  if (likeButton.classList.contains("card__like-button")) {
    likeButton.classList.toggle("card__like-button_is-active");
  }
}
