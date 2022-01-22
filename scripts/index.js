const page = document.querySelector('.page');
const cardContainer = page.querySelector('.cards');
const profileEditButton = page.querySelector('.profile__edit-button');
const profileTitle = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const profileAddButton = page.querySelector('.profile__add-button');
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
//Функция добавления карточек на страницу
function renderCard (item) {
  const cardTemplate = page.querySelector('#cards').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const likeButton = card.querySelector('.card__like-button');
  const cardTrash = card.querySelector('.card__trash');
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;

  cardImage.addEventListener('click', () => {
    hangleClickCardImage(cardImage);
  });

  likeButton.addEventListener('click', () => {
    likeButtonActive(likeButton);
  });

  cardTrash.addEventListener('click', () => {
    removeElement(cardTrash)
  });
  cardContainer.prepend(card);
};
//перебор массива для рендера карточек
initialCards.forEach(function(initialCards) {
  renderCard (initialCards);
});
//Попап редактирования профиля
const popupProfile = page.querySelector('.popup_value_profile');
const popupProfileForm = popupProfile.querySelector('.form');
const popupProfileInputName = popupProfile.querySelector('.form__item-text_value_name');
const popupProfileInputJob = popupProfile.querySelector('.form__item-text_value_job');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const popupProfileOverlay = popupProfile.querySelector('.popup__overlay');
//вставка данных в профиль из инпутов
profileTitle.textContent = popupProfileInputName.value;
profileSubtitle.textContent = popupProfileInputJob.value;
//откртие попапа
const openPopup = (elm) => {
  elm.classList.add('popup_opened');
};
//закрытие попапа
const closePopup = (elm) => {
  elm.classList.remove('popup_opened');
};
//Кнопка лайка
const likeButtonActive = (elm) => {
  elm.classList.toggle('card__like-button_active');
};
//Удаление карточки
const removeElement = (elm) => {
  const card = elm.closest('.card');
  card.remove();
};
//Функция обработчика субмита попапа редактирования профиля
const handlePopupProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupProfileInputName.value;
  profileSubtitle.textContent = popupProfileInputJob.value;
  closePopup (popupProfile);
};
//Функция закрытия попапа редактирования профиля и сохранение исходных данных в инпутах
const handlePopupProfileClose = () => {
  popupProfileInputName.value = profileTitle.textContent;
  popupProfileInputJob.value = profileSubtitle.textContent;
  closePopup (popupProfile);
};

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
});

popupProfileForm.addEventListener('submit', (handlePopupProfileFormSubmit));

popupProfileCloseButton.addEventListener('click', handlePopupProfileClose);

popupProfileOverlay.addEventListener('click', handlePopupProfileClose);
// Попап добавления карточек
const popupAddCard = page.querySelector('.popup_value_add-card');
const popupAddCardForm = popupAddCard.querySelector('.form');
const popupAddCardInputCardName = popupAddCard.querySelector('.form__item-text_value_card-name');
const popupAddCardInputLinkPhoto = popupAddCard.querySelector('.form__item-text_value_link-photo');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const popupAddCardOverlay = popupAddCard.querySelector('.popup__overlay');

profileAddButton.addEventListener('click', () => {
  openPopup (popupAddCard);
});
//Функция обработчика субмита попапа добавления карточки
const handlePopupAddCardFormSubmit = evt => {
  evt.preventDefault();
  const card = {
    name: popupAddCardInputCardName.value,
    link: popupAddCardInputLinkPhoto.value
  };
  renderCard(card);
  popupAddCardForm.reset();
  closePopup (popupAddCard);
};

popupAddCardForm.addEventListener('submit', handlePopupAddCardFormSubmit);

popupAddCardCloseButton.addEventListener('click', () => {
  popupAddCardForm.reset();
  closePopup (popupAddCard);
});

popupAddCardOverlay.addEventListener('click', () => {
  popupAddCardForm.reset();
  closePopup (popupAddCard);
});
//Попап картинки при нажатии
const imagePopup = page.querySelector('.popup-image');
const imagePopupItem = imagePopup.querySelector('.popup-image__item');
const imagePopupTitle = imagePopup.querySelector('.popup-image__title');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');
const imagePopupOverlay = imagePopup.querySelector('.popup-image__overlay');

imagePopupCloseButton.addEventListener('click', () => {
  closePopup (imagePopup);
});

imagePopupOverlay.addEventListener('click', () => {
  closePopup (imagePopup);
});
//Функция с помощью которой передаются данные для попапа при нажатии на картинку
const hangleClickCardImage = (item) => {
  openPopup(imagePopup);
  imagePopupItem.src = item.src;
  imagePopupItem.alt = item.alt;
  imagePopupTitle.textContent = item.alt;
};


