//Переменные, с которыми работаем
import { FormValidator } from './FormValidator.js';
import {Card} from './Card.js';
const page = document.querySelector('.page');
const cardsContainer = page.querySelector('.cards');
//Переменные которые работают с профилем
const profileEditButton = page.querySelector('.profile__edit-button');
const profileTitle = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const profileAddButton = page.querySelector('.profile__add-button');
const popupProfileElement = page.querySelector('.popup_value_profile');
const popupProfileForm = popupProfileElement.querySelector('.form');
const popupProfileInputName = popupProfileElement.querySelector('.form__input_value_name');
const popupProfileInputJob = popupProfileElement.querySelector('.form__input_value_job');
const popupProfileCloseButton = popupProfileElement.querySelector('.popup__close-button');
const popupProfileOverlay = popupProfileElement.querySelector('.popup__overlay');
//Перменные для попапа Card
const popupAddCardElement = page.querySelector('.popup_value_add-card');
const popupAddCardForm = popupAddCardElement.querySelector('.form');
const popupAddCardInputCardName = popupAddCardElement.querySelector('.form__input_value_card-name');
const popupAddCardInputLinkPhoto = popupAddCardElement.querySelector('.form__input_value_link-photo');
const popupAddCardCloseButton = popupAddCardElement.querySelector('.popup__close-button');
const popupAddCardOverlay = popupAddCardElement.querySelector('.popup__overlay');
//формы
const formAddCard = page.querySelector('form[name="form-add-card"]');
const formProfileEdit = page.querySelector('form[name="form-profile"]');
//стартовые карточки
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];
//Конфиг для валидации форм
const configValidation = {
  errorInputText: 'form__input_type_error',
  inputTextClass: '.form__input',
  errorInputSpan: 'form__input-error_active',
  buttonSubmit: '.form__button-submit',
  buttonSubmitDisabled: 'form__button-submit_disabled',
  forms: '.form',
};

// открытие попапа
// export const openPopup = (elm) => {
//   elm.classList.add('popup_opened');
//   page.addEventListener('keydown', handleClickEscape);
// };
// //закрытие попапа
// export const closePopup = (elm) => {
//   elm.classList.remove('popup_opened');
//   page.removeEventListener('keydown', handleClickEscape);
// };
//зыкрытие попапа по нажатию на Escape
// const handleClickEscape = (evt) => {
//   if(evt.key === 'Escape') {
//     const popup = page.querySelector('.popup_opened');
//     closePopup(popup);
//   };
// };
//Функция обработчика субмита попапа редактирования профиля
const handlePopupProfileFormSubmit = (evt) => {
  evt.preventDefault();
  insertDataProfileInput();
  closePopup(popupProfile);
};
//Функция открытия попапа редактирования профиля и загрузка данных из инпутов
const handlePopupProfileOpen = () => {
  popupProfileInputName.value = profileTitle.textContent;
  popupProfileInputJob.value = profileSubtitle.textContent;
  openPopup(popupProfile);
};
//Функция обработчика субмита попапа добавления карточки
const handlePopupAddCardFormSubmit = evt => {
  evt.preventDefault();
  const card = {
    name: popupAddCardInputCardName.value,
    link: popupAddCardInputLinkPhoto.value
  };

  addCard(card, '#card', cardsContainer);
  popupAddCardForm.reset();
  closePopup(popupAddCard);
  addCardFormValidation.deactivateButton();
};

//вставка данных в профиль из инпутов
const insertDataProfileInput = () => {
  profileTitle.textContent = popupProfileInputName.value;
  profileSubtitle.textContent = popupProfileInputJob.value;
};
//Функция установки валидации
const createClassValidationForm = (config, formSelector) => {
  const formValidator = new FormValidator(config, formSelector);
  return formValidator;
};
//Создание карточки из класса Card

//Функция добавления карточки в html

//Открытие попапПрофиля
profileEditButton.addEventListener('click', () => {
  popupProfile.open()
});
//Отправка попапПрофиля
popupProfileForm.addEventListener('submit', handlePopupProfileFormSubmit);
//Закрытие через кнопку попапПрофиля
// popupProfileCloseButton.addEventListener('click', () => {
//   popupProfile.close();
// });
//Закрытие через фон попап профиля
// popupProfileOverlay.addEventListener('click', () => {
//   closePopup(popupProfile);
// });
//Открытие попапа добавления карточки
profileAddButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});
//Обработка формы добавления карточки
popupAddCardForm.addEventListener('submit', handlePopupAddCardFormSubmit);
//Закрытие через кнопка попапа добавления карточки
// popupAddCardCloseButton.addEventListener('click', () => {
//   closePopup(popupAddCard);
// });
//Закрытие через фон попапа добавления карточки
// popupAddCardOverlay.addEventListener('click', () => {
//   closePopup(popupAddCard);
// });
//Перебор массива с карточками

//вставка данных в профиль при загрузке страницы
insertDataProfileInput();
//создание коасса валидация формы добавления карточки
const addCardFormValidation = createClassValidationForm(configValidation, formAddCard);
addCardFormValidation.enableValidation();
//создание класса валидация формы редактирования профиля
const profileFormValidation = createClassValidationForm(configValidation, formProfileEdit);
profileFormValidation.enableValidation();

export {page};

import Section from './Section.js';

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardsContainer);

cardList.renderItems();

import Popup from './Popup.js';

const popupProfile = new Popup(popupProfileElement);
popupProfile.setEventListeners()
