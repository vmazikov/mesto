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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// Кусок кода отвечающий за стартовое добавление карточек на страницу
const cardContainer = document.querySelector('.cards');

const cardTemplate = document.querySelector('#cards').content;

initialCards.forEach(function (item) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__title').textContent = item.name;
  card.querySelector('.card__image').src = item.link;

  card.querySelector('.card__like-button').addEventListener('click', function () {
    card.querySelector('.card__like-button').classList.add('card__like-button_active');
  });

  cardContainer.append(card);
});



