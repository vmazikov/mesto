const page = document.querySelector('.page');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const cardContainer = document.querySelector('.cards');
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
// функция стартового добавления карточек из массива initialCards на страницу
function addCard () {
  const cardTemplate = document.querySelector('#cards').content;
  //перебор массива и заполнение карточкек элементами массива
  initialCards.forEach(function (item) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const likeButton = card.querySelector('.card__like-button');
    const cardTrash = card.querySelector('.card__trash');
    cardTitle.textContent = item.name;
    cardImage.alt = item.name;
    cardImage.src = item.link;
    //Цикл установки лайка в зависимости от текушего модификатора
    likeButton.addEventListener('click', function () {
      if (likeButton.classList.contains('card__like-button_active')) {
        likeButton.classList.remove('card__like-button_active');
      } else {
        likeButton.classList.add('card__like-button_active');
      }
    });
    //Добавляем функцию удаления карточки через корзину
    cardTrash.addEventListener('click', function () {
      const cardItem = cardTrash.closest('.card');
      cardItem.remove();
    });
    //Откртие попапа с увеличением картинки
    cardImage.addEventListener('click', function () {
      const cardImagePopup = document.querySelector('.popup-image');
      const popupImage = cardImagePopup.querySelector('.popup-image__item');
      const popupTitle = cardImagePopup.querySelector('.popup-image__title');
      const closeButton = cardImagePopup.querySelector('.popup__close-button');
      const overlay = cardImagePopup.querySelector('.popup__overlay');
      cardImagePopup.classList.add('popup_opened');
      popupImage.src = card.querySelector('.card__image').src;
      popupImage.alt = card.querySelector('.card__title').textContent;
      popupTitle.textContent = card.querySelector('.card__title').textContent;
      //закрытие через кнопку
      closeButton.addEventListener('click', function () {
        cardImagePopup.classList.remove('popup_opened');
      });
      //закрытие через фон
      overlay.addEventListener('click', function () {
        cardImagePopup.classList.remove('popup_opened');
      });
    });
    //Добавление карточек на страницу
    cardContainer.append(card);
  });
}
addCard();

//Код для добавления попапа редактирования профиля
function profileEditPopup () {
  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

  const popupTemplate = document.querySelector('#popup').content;
  const popupElement = popupTemplate.querySelector('.popup').cloneNode(true);
  const popupTitle = popupElement.querySelector('.popup__title');
  const form = popupElement.querySelector('.form');
  const mainInput = popupElement.querySelector('.form__item-text_value_main');
  const secInput = popupElement.querySelector('.form__item-text_value_secondary');
  const formSubmit = popupElement.querySelector('.form__item-submit');
  const popupCloseButton = popupElement.querySelector('.popup__close-button');
  const popupOverlay = popupElement.querySelector('.popup__overlay');
  //заполнение темплейта попапа
  popupTitle.textContent = 'Редактировать профиль';
  form.name = 'form-profile';
  mainInput.name = 'form__item-text_value_name';
  mainInput.placeholder = 'Имя';
  mainInput.value = 'Жак-Ив Кусто';
  secInput.name = 'form__item-text_value_job';
  secInput.placeholder = 'О себе';
  secInput.value = 'Исследователь океана';
  formSubmit.textContent = 'Сохранить';
  page.append(popupElement);
  //Открытие попапа
  profileEditButton.addEventListener('click', function () {
    popupElement.classList.add('popup_opened');
  });
  //Присваеваем текст профиля в инпуты
  profileTitle.textContent = mainInput.value;
  profileSubtitle.textContent = secInput.value;
  //Закрытие попапа после нажатия субмита
  form.addEventListener('submit',  function (evt) {
    evt.preventDefault();
    profileTitle.textContent = mainInput.value;
    profileSubtitle.textContent = secInput.value;
    popupElement.classList.remove('popup_opened');
  });
  //закрытие попапа по кнопке закрытия с сохранением данных в инпутах из профиля
  popupCloseButton.addEventListener('click', function() {
    popupElement.classList.remove('popup_opened');
    mainInput.value = profileTitle.textContent;
    secInput.value = profileSubtitle.textContent;
  });
  //закрытие попапа по нажатию на фон с сохранением данных в инпутах из профиля
  popupOverlay.addEventListener('click', function() {
    popupElement.classList.remove('popup_opened');
    mainInput.value = profileTitle.textContent;
    secInput.value = profileSubtitle.textContent;
  });
};
profileEditPopup ();

// Код для добавления попапа добавления карточек
function cardAddPopup () {
  const popupTemplate = document.querySelector('#popup').content;
  const popupElement = popupTemplate.querySelector('.popup').cloneNode(true);
  const popupTitle = popupElement.querySelector('.popup__title');
  const form = popupElement.querySelector('.form');
  const mainInput = popupElement.querySelector('.form__item-text_value_main');
  const secInput = popupElement.querySelector('.form__item-text_value_secondary');
  const formSubmit = popupElement.querySelector('.form__item-submit');
  const formElement = popupElement.querySelector('.form');
  const cardNameInput = popupElement.querySelector('.form__item-text_value_main');
  const photoLinkInput = popupElement.querySelector('.form__item-text_value_secondary');
  const popupCloseButton = popupElement.querySelector('.popup__close-button');
  const popupOverlay = popupElement.querySelector('.popup__overlay');
  //заполнение темплейта попапа
  popupTitle.textContent = 'Новое место';
  form.name = 'form-add-card';
  mainInput.name = 'form__item-text_value_card-name';
  mainInput.placeholder = 'Название';
  mainInput.value = '';
  secInput.name = 'form__item-text_value_link-photo';
  secInput.placeholder = 'Ссылка на картинку';
  secInput.value = '';
  formSubmit.textContent = 'Создать';
  page.append(popupElement);

  //Открытие попапа
  profileAddButton.addEventListener('click', function () {
    popupElement.classList.add('popup_opened');
  });
  //Клонируем карточку при нажатии на субмит
  formElement.addEventListener('submit',  function (evt) {
    evt.preventDefault();
    const cardTemplate = document.querySelector('#cards').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const cardTrash = card.querySelector('.card__trash');
    const likeButton = card.querySelector('.card__like-button');
    //присваеваем в карточку заполненые поля инпутов
    cardTitle.textContent = cardNameInput.value;
    cardImage.src = photoLinkInput.value;
    //Добавляем функцию удаления карточки через корзину
    cardTrash.addEventListener('click', function () {
      const cardItem = cardTrash.closest('.card');
      cardItem.remove();
    });
    //Цикл установки лайка в зависимости от текушего модификатора
    likeButton.addEventListener('click', function () {
      if (likeButton.classList.contains('card__like-button_active')) {
        likeButton.classList.remove('card__like-button_active');
      } else {
        likeButton.classList.add('card__like-button_active');
      }
    });
    //Откртие попапа с увеличением картинки
    cardImage.addEventListener('click', function () {
      const cardImagePopup = document.querySelector('.popup-image');
      const popupImage = cardImagePopup.querySelector('.popup-image__item');
      const popupTitle = cardImagePopup.querySelector('.popup-image__title');
      const closeButton = cardImagePopup.querySelector('.popup__close-button');
      const overlay = cardImagePopup.querySelector('.popup__overlay');
      cardImagePopup.classList.add('popup_opened');
      popupImage.src = cardImage.src;
      popupImage.alt = cardImage.textContent;
      popupTitle.textContent = cardTitle.textContent;
      //закрытие через кнопку
      closeButton.addEventListener('click', function () {
        cardImagePopup.classList.remove('popup_opened');
      });
      //закрытие через фон
      overlay.addEventListener('click', function () {
        cardImagePopup.classList.remove('popup_opened');
      });
    });
    //Добавление карточку на страницу и закрытие попапа добавления карточек
    cardContainer.prepend(card);
    cardNameInput.value = '';
    photoLinkInput.value = '';
    popupElement.classList.remove('popup_opened');
  });
  //закрытие попапа по кнопке
  popupCloseButton.addEventListener('click', function () {
    popupElement.classList.remove('popup_opened');
  });
  //закрытие попапа через фон
  popupOverlay.addEventListener('click', function () {
    popupElement.classList.remove('popup_opened');
  });
};
cardAddPopup();
//доавление попапа с увеличением картинки на страницу
function addPopupImage () {
  const cardImagePopupTemplate = document.querySelector('#popup-image').content;
  const cardImageElement = cardImagePopupTemplate.querySelector('.popup-image').cloneNode(true);
  page.append(cardImageElement);
};
addPopupImage ()


