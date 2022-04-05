const baikal = new URL('../../images/baikal.jpg', import.meta.url);
const holmogorskiy = new URL('../../images/kholmogorsky-rayon.jpg', import.meta.url);
const kamchatka = new URL('../../images/kamchatka.jpg', import.meta.url);
const ivanovo = new URL('../../images/ivanovo.jpg', import.meta.url);
const chelyabinsk = new URL('../../images/chelyabinsk-oblast.jpg', import.meta.url);
const arhyz = new URL('../../images/arkhyz.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Байкал',
    link: baikal
  },
  {
    name: 'Холмогорский район',
    link: holmogorskiy
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Иваново',
    link: ivanovo
  },
  {
    name: 'Челябинская область',
    link: chelyabinsk
  },
  {
    name: 'Архыз',
    link: arhyz
  }
];
export const configValidation = {
  errorInputText: 'form__input_type_error',
  inputTextClass: '.form__input',
  errorInputSpan: 'form__input-error_active',
  buttonSubmit: '.form__button-submit',
  buttonSubmitDisabled: 'form__button-submit_disabled',
  forms: '.form',
};
export const cardsContainer = document.querySelector('.cards');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button')
export const profileName = document.querySelector('.profile__title');
export const profileAbout = document.querySelector('.profile__subtitle');
export const avatarEditButton = document.querySelector('.profile__avatar-button');

export const popupProfileElement = document.querySelector('.popup_value_profile');
export const popupAddCardElement = document.querySelector('.popup_value_add-card');
export const popupDeleteCardElement = document.querySelector('.popup_value_delete-card');
export const popupAvatarEditElement = document.querySelector('.popup_value_link-avatar');

export const popupProfileInputName = popupProfileElement.querySelector('.form__input_value_name');
export const popupProfileInputAbout = popupProfileElement.querySelector('.form__input_value_about');
export const formAddCard = document.querySelector('form[name="form-add-card"]');
export const formProfileEdit = document.querySelector('form[name="form-profile"]');
export const openPopupPicture = document.querySelector('.popup-image');
