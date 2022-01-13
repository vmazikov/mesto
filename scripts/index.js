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

  initialCards.forEach(function (item) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const cardLike = card.querySelector('.card__like-button');
    cardTitle.textContent = item.name;
    cardImage.alt = item.name;
    cardImage.src = item.link;

    cardLike.addEventListener('click', function () {
      if (cardLike.classList.contains('card__like-button_active')) {
        cardLike.classList.remove('card__like-button_active');
      } else {
        cardLike.classList.add('card__like-button_active');
      }
    });
    cardContainer.append(card);
  });
}
addCard();

//Код для добавления попапа редактирования профиля
function profileEditPopup () {
  const popupTemplate = document.querySelector('#popup').content;
  const popupElement = popupTemplate.querySelector('.popup').cloneNode(true);
  popupElement.querySelector('.popup__title').textContent = 'Редактировать профиль';
  popupElement.querySelector('.form').name = 'form-profile';
  popupElement.querySelector('.form__item-text_value_main').name = 'form__item-text_value_name';
  popupElement.querySelector('.form__item-text_value_main').placeholder = 'Имя';
  popupElement.querySelector('.form__item-text_value_main').value = 'Жак-Ив Кусто';
  popupElement.querySelector('.form__item-text_value_secondary').name = 'form__item-text_value_job';
  popupElement.querySelector('.form__item-text_value_secondary').placeholder = 'О себе';
  popupElement.querySelector('.form__item-text_value_secondary').value = 'Исследователь океана';
  popupElement.querySelector('.form__item-submit').textContent = 'Сохранить';
  page.append(popupElement);

  //Обьявляем переменные, с которыми работает функция
  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
  const formElement = popupElement.querySelector('.form');
  const nameInput = popupElement.querySelector('.form__item-text_value_main');
  const jobInput = popupElement.querySelector('.form__item-text_value_secondary');
  const popupCloseButton = popupElement.querySelector('.popup__close-button');
  const popupOverlay = popupElement.querySelector('.popup__overlay');
  //Открытие попапа
  profileEditButton.addEventListener('click', function () {
    popupElement.classList.add('popup_opened');
  });

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  formElement.addEventListener('submit',  function (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupElement.classList.remove('popup_opened');
  });

  popupCloseButton.addEventListener('click', function() {
    popupElement.classList.remove('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  });
  popupOverlay.addEventListener('click', function() {
    popupElement.classList.remove('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  });
};
profileEditPopup ();

// Код для добавления попапа добавления карточек
function cardAddPopup () {
  const popupTemplate = document.querySelector('#popup').content;
  const popupElement = popupTemplate.querySelector('.popup').cloneNode(true);
  popupElement.querySelector('.popup__title').textContent = 'Новое место';
  popupElement.querySelector('.form').name = 'form-add-card';
  popupElement.querySelector('.form__item-text_value_main').name = 'form__item-text_value_card-name';
  popupElement.querySelector('.form__item-text_value_main').placeholder = 'Название';
  popupElement.querySelector('.form__item-text_value_main').value = '';
  popupElement.querySelector('.form__item-text_value_secondary').name = 'form__item-text_value_link-photo';
  popupElement.querySelector('.form__item-text_value_secondary').placeholder = 'Ссылка на картинку';
  popupElement.querySelector('.form__item-text_value_secondary').value = '';
  popupElement.querySelector('.form__item-submit').textContent = 'Создать';
  page.append(popupElement);
  //Обьявляем переменные, с которыми работает функция
  const formElement = popupElement.querySelector('.form');
  const cardNameInput = popupElement.querySelector('.form__item-text_value_main');
  const photoLinkInput = popupElement.querySelector('.form__item-text_value_secondary');
  const popupCloseButton = popupElement.querySelector('.popup__close-button');
  const popupOverlay = popupElement.querySelector('.popup__overlay');

  profileAddButton.addEventListener('click', function () {
    popupElement.classList.add('popup_opened');
  });

  formElement.addEventListener('submit',  function (evt) {
    evt.preventDefault();
    const cardTemplate = document.querySelector('#cards').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__title').textContent = cardNameInput.value;
    card.querySelector('.card__image').src = photoLinkInput.value;

    card.querySelector('.card__like-button').addEventListener('click', function () {
      const cardLike = card.querySelector('.card__like-button');
      if (cardLike.classList.contains('card__like-button_active')) {
        cardLike.classList.remove('card__like-button_active');
      } else {
        cardLike.classList.add('card__like-button_active');
      }
    });

    cardContainer.prepend(card);
    cardNameInput.value = '';
    photoLinkInput.value = '';
    popupElement.classList.remove('popup_opened');
  });

  popupCloseButton.addEventListener('click', function () {
    popupElement.classList.remove('popup_opened');
  });

  popupOverlay.addEventListener('click', function () {
    popupElement.classList.remove('popup_opened');
  });

};
cardAddPopup();

