import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {
  initialCards, configValidation, cardsContainer,
  profileEditButton, addCardButton, profileName,
  profileJob, popupProfileElement, popupProfileInputName,
  popupProfileInputJob, popupAddCardElement, formAddCard,
  formProfileEdit, openPopupPicture,
} from '../scripts/utils/constants.js';

//Попап с картинкой
const popupWithImage = new PopupWithImage(openPopupPicture);
//Создание попапа редактирования профиля
const editProfilePopup = new PopupWithForm(popupProfileElement, {
  formSubmitCallBack: (data) => {
    userInfo.setUserInfo(data);
    editProfilePopup.close();
  },
});
//Создание попапа добавления карточки
const addNewCardPopup = new PopupWithForm(popupAddCardElement, {
  formSubmitCallBack: (data) => {
    const card = {
      name: data.cardName,
      link: data.cardLink
    };
    renderCard(card);
    addNewCardPopup.close();
  }
});
//Получение данных из кликнутой картинки для попапа с картинкой
const handleCardClick = (evt) => {
  const data = {
    link: evt.target.src,
    title: evt.target.alt
  };
  popupWithImage.open(data);
};
//Получшение карточкии и добавление на страницу
const renderCard = (item) => {
  const card = new Card(item, '#card', handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};
//Секция в которой генерируются стартовые карточки
const cardList = new Section({
  items: initialCards,
  renderer: renderCard
}, cardsContainer);
//Добавление на страницу стартовых карточек
cardList.renderItems();
//Получение информации о пользователе со страницы
const userInfo = new UserInfo( {
  data: {
    name: profileName,
    job: profileJob
  }
});
//Функция установки валидации
const createClassValidationForm = (config, formSelector) => {
  const formValidator = new FormValidator(config, formSelector);
  return formValidator;
};
//создание коасса валидация формы добавления карточки
const addCardFormValidation = createClassValidationForm(configValidation, formAddCard);
addCardFormValidation.enableValidation();
//создание класса валидация формы редактирования профиля
const profileFormValidation = createClassValidationForm(configValidation, formProfileEdit);
profileFormValidation.enableValidation();
//Активация слушателей для попапа с картинкой
popupWithImage.setEventListeners();
//Слушатели для попапа редактирования профиля
editProfilePopup.setEventListeners();
//Слушатели для попапа довления карточки
addNewCardPopup.setEventListeners();
//Слушатели нажатия кнопки открытия попапа редактирования
profileEditButton.addEventListener('click', () => {
  editProfilePopup.open();
  const data = userInfo.getUserInfo();
  popupProfileInputName.value = data.name;
  popupProfileInputJob.value = data.job;
});
//Слаушатели нажатия кнопки открытия попапа добавления карточки
addCardButton.addEventListener('click', () => {
  addNewCardPopup.open();
});


