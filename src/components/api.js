import { request } from "./utils/utilits";
import { config } from "./utils/constants";

//API
//1. информации о пользователе с сервера
function getUserInfo() {
  return request("/users/me", {
    headers: config.headers,
  });
}

//1. получить карточки с сервера
function getCards() {
  return request("/cards", {
    headers: config.headers,
  });
}

//Редактирование профиля. Отправка данных на сервер
function sendUserData(name, about) {
  return request("/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  });
}

// Добавление новой карточки на сервер
function sendCard(cardData) {
  return request("/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardData),
  });
}

//Удаление карточки с сервера
function deleteCard(cardId) {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

function putLikeCard(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
}

function deleteLikeCard(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

function changeAvatarImage(avatar) {
  return request("/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  });
}

export { getUserInfo, getCards, sendUserData, sendCard, deleteCard, putLikeCard, deleteLikeCard, changeAvatarImage };
