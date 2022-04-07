import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js'
import {
  configValidation, cardsContainer,
  profileEditButton, addCardButton, profileName,
  profileAbout, popupProfileElement, popupProfileInputName,
  popupProfileInputAbout, popupAddCardElement, formAddCard,
  formProfileEdit, openPopupPicture, avatarEditButton,
  popupDeleteCardElement, popupAvatarEditElement, avatarElement
} from '../scripts/utils/constants.js';
import './index.css';
import '../index.html';
//Класс для работы с Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
  headers: {
    authorization: 'c5574a18-57da-4843-aac5-f62cca636fb4',
    'Content-Type': 'application/json'
  }
});
//Переменная, которая хранит userId полученный с сервера
let userId
//Получение данных профиля и добавление карточек
Promise.all([api.getProfile(), api.getCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        cards.forEach(data => {
          renderCard(data)
        });
    })
    .catch((err) => {
        console.log(err);

    });
//Попап редактирования аватара
const editAvatarPopup = new PopupWithForm(popupAvatarEditElement, {
  formSubmitCallBack: (data) => {
    editAvatarPopup.renderLoading(true);
    api.editAvatar(data)
      .then(res => {
        userInfo.setUserAvatar(res);
        editAvatarPopup.close();
        avatarFormValidation.deactivateButton();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        editProfilePopup.renderLoading(false);
      })
  }
})

//Попап с картинкой
const popupWithImage = new PopupWithImage(openPopupPicture);
//Создание попапа редактирования профиля
const editProfilePopup = new PopupWithForm(popupProfileElement, {
  formSubmitCallBack: (data) => {
    editProfilePopup.renderLoading(true)
    api.editProfile(data.name, data.about, data)
      .then(res => {
        userInfo.setUserInfo(res);
        editProfilePopup.close();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        editProfilePopup.renderLoading(false)
      })
  }
});
//Создание попапа добавления карточки
const addNewCardPopup = new PopupWithForm(popupAddCardElement, {
  formSubmitCallBack: (data) => {
    addNewCardPopup.renderLoading(true)
    api.addCard(data.cardName, data.cardLink)
      .then(res => {
        cardList.addNewItem(createCard(res));
        addNewCardPopup.close();
        addCardFormValidation.deactivateButton();
      })
      .catch(err => {
      console.log(err)
      })
      .finally(() => {
        addNewCardPopup.renderLoading(false)
      })

  }
});
//попап удаления карточки
const deleteCardPopup = new PopupWithConfirm(popupDeleteCardElement, {})
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
  const card = new Card(item, '#card', handleCardClick, userId,
  //Функция для удаления карточек
  (id) => {
    deleteCardPopup.cardDeleteSubmit(() => {
      deleteCardPopup.renderLoading(true)
      api.deleteCard(id)
        .then(res => {
          card.removeElement();
          deleteCardPopup.close();
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          deleteCardPopup.renderLoading(false)
        })
    })
    deleteCardPopup.open();
  },
  //Функция нажатия на лайк и получения новых данных
  (id) => {
    if(card.isLiked()) {
      api.deleteLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      api.addLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
        .catch(err => {
          console.log(err)
        })
    }
  });
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
    about: profileAbout,
    avatar: avatarElement,
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
//Создание класса валидации для формы редактирования профиля
const avatarFormValidation = createClassValidationForm(configValidation, popupAvatarEditElement);
avatarFormValidation.enableValidation();
//Активация слушателей для попапа с картинкой
popupWithImage.setEventListeners();
//Слушатели для попапа редактирования профиля
editProfilePopup.setEventListeners();
//Слушатели для попапа довления карточки
addNewCardPopup.setEventListeners();
//Слушатели для попапа удаления карточки
deleteCardPopup.setEventListeners();
//Слушатели для попапа редактивания аватара
editAvatarPopup.setEventListeners();

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
//Слушатель нажатия кнопки редактирования автара
avatarEditButton.addEventListener('click', () => {
  editAvatarPopup.open();
})



