import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import {
  initialCards, configValidation, cardsContainer,
  profileEditButton, addCardButton, profileName,
  profileAbout, popupProfileElement, popupProfileInputName,
  popupProfileInputAbout, popupAddCardElement, formAddCard,
  formProfileEdit, openPopupPicture, avatarEditButton,
  popupDeleteCardElement, popupAvatarEditElement,
} from '../scripts/utils/constants.js';
import './index.css';
import '../index.html';
//Попап с картинкой
const popupWithImage = new PopupWithImage(openPopupPicture);
//Создание попапа редактирования профиля
const editProfilePopup = new PopupWithForm(popupProfileElement, {
  formSubmitCallBack: (data) => {
    api.editProfile(data.name, data.about)
      .then(res => {
        console.log(res);
        userInfo.setUserInfo(res);
        editProfilePopup.close();
      })

  },
});
//Создание попапа добавления карточки
const addNewCardPopup = new PopupWithForm(popupAddCardElement, {
  formSubmitCallBack: (data) => {
    // const card = {
    //   name: data.cardName,
    //   link: data.cardLink
    // };
    console.log(data)
    api.addCard(data.cardName, data.cardLink)
      .then(res => {
        const card = {
          name: res.name,
          link: res.link
        };
        renderCard(card);
        addNewCardPopup.close();
        addCardFormValidation.deactivateButton();
      });
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
//Создание карточки
const createCard = (item) => {
  const card = new Card(item, '#card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}
//Получшение карточкии и добавление на страницу
const renderCard = (item) => {
  const card = createCard(item);
  cardList.addItem(card);
};
//Секция в которой генерируются стартовые карточки
const cardList = new Section({
  items: [],
  renderer: renderCard
}, cardsContainer);
//Добавление на страницу стартовых карточек
cardList.renderItems();
//Получение информации о пользователе со страницы
const userInfo = new UserInfo( {
  data: {
    name: profileName,
    about: profileAbout
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
  popupProfileInputAbout.value = data.about;
});
//Слаушатели нажатия кнопки открытия попапа добавления карточки
addCardButton.addEventListener('click', () => {
  addNewCardPopup.open();
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
  headers: {
    authorization: 'c5574a18-57da-4843-aac5-f62cca636fb4',
    'Content-Type': 'application/json'
  }
});

api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res)
  })

api.getInitialCards()
  .then(cardItems => {
    cardItems.forEach(data => {
      const card = createCard(data)
      cardList.addItem(card);
    })
  })
