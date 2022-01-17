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
    const cardTrash = card.querySelector('.card__trash');
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

    cardTrash.addEventListener('click', function () {
      const cardItem = cardTrash.closest('.card');
      cardItem.remove();
    });
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


      closeButton.addEventListener('click', function () {
        cardImagePopup.classList.remove('popup_opened');
      })

      overlay.addEventListener('click', function () {
        cardImagePopup.classList.remove('popup_opened');
      })

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


  profileAddButton.addEventListener('click', function () {
    popupElement.classList.add('popup_opened');
  });

  formElement.addEventListener('submit',  function (evt) {
    evt.preventDefault();
    const cardTemplate = document.querySelector('#cards').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__title').textContent = cardNameInput.value;
    card.querySelector('.card__image').src = photoLinkInput.value;

    const cardTrash = card.querySelector('.card__trash');

    cardTrash.addEventListener('click', function () {
      const cardItem = cardTrash.closest('.card');
      cardItem.remove();
    });

    card.querySelector('.card__like-button').addEventListener('click', function () {
      const cardLike = card.querySelector('.card__like-button');
      if (cardLike.classList.contains('card__like-button_active')) {
        cardLike.classList.remove('card__like-button_active');
      } else {
        cardLike.classList.add('card__like-button_active');
      }
    });

    card.querySelector('.card__image').addEventListener('click', function () {
      const cardImagePopup = document.querySelector('.popup-image');
      const popupImage = cardImagePopup.querySelector('.popup-image__item');
      const popupTitle = cardImagePopup.querySelector('.popup-image__title');
      const closeButton = cardImagePopup.querySelector('.popup__close-button');
      const overlay = cardImagePopup.querySelector('.popup__overlay');
      cardImagePopup.classList.add('popup_opened');
      popupImage.src = card.querySelector('.card__image').src;
      popupImage.alt = card.querySelector('.card__title').textContent;
      popupTitle.textContent = card.querySelector('.card__title').textContent;


      closeButton.addEventListener('click', function () {
        cardImagePopup.classList.remove('popup_opened');
      })

      overlay.addEventListener('click', function () {
        cardImagePopup.classList.remove('popup_opened');
      })

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

function addPopupImage () {
  const cardImagePopupTemplate = document.querySelector('#popup-image').content;
  const cardImageElement = cardImagePopupTemplate.querySelector('.popup-image').cloneNode(true);
  page.append(cardImageElement);
};
addPopupImage ()


