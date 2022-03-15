export const initialCards = [
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
export const profileJob = document.querySelector('.profile__subtitle');
export const popupProfileElement = document.querySelector('.popup_value_profile');
export const popupProfileInputName = popupProfileElement.querySelector('.form__input_value_name');
export const popupProfileInputJob = popupProfileElement.querySelector('.form__input_value_job');
export const popupAddCardElement = document.querySelector('.popup_value_add-card');
export const formAddCard = document.querySelector('form[name="form-add-card"]');
export const formProfileEdit = document.querySelector('form[name="form-profile"]');
export const openPopupPicture = document.querySelector('.popup-image');
