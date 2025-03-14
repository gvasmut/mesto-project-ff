import { config } from "./constants";
import { closePopup } from "../modal";

export function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//смена кнопки при загрузке на сервер
function renderLoading(isLoading, button, buttonText = "Сохранить", loadingText = "Сохранение...") {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

//функция для отправки данных
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
      closePopup(evt.target.closest(".popup"));
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}
