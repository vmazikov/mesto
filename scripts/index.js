let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let popupOverlay = document.querySelector('.popup__overlay');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

profileEditButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item-text_value_name');
let jobInput = formElement.querySelector('.form__item-text_value_job');

profileTitle.textContent = nameInput.value;
profileSubtitle.textContent = jobInput.value;

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

popupOverlay.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

