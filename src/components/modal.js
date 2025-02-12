//ф-ции открытия и закрытия попапов

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
  document.addEventListener("click", overlayHandler);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandler);
  document.removeEventListener("click", overlayHandler);
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closePopup(openPopup);
  }
}

function overlayHandler(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
