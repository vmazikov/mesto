//Переменные, с которыми работаем
const page = document.querySelector('.page');
const popups = page.querySelectorAll('.popup');
const cardContainer = page.querySelector('.cards');
const profileEditButton = page.querySelector('.profile__edit-button');
const profileTitle = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const profileAddButton = page.querySelector('.profile__add-button');
const popupProfile = page.querySelector('.popup_value_profile');
const popupProfileForm = popupProfile.querySelector('.form');
const popupProfileInputName = popupProfile.querySelector('.form__input_value_name');
const popupProfileInputJob = popupProfile.querySelector('.form__input_value_job');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const popupProfileOverlay = popupProfile.querySelector('.popup__overlay');
const popupAddCard = page.querySelector('.popup_value_add-card');
const popupAddCardForm = popupAddCard.querySelector('.form');
const popupAddCardInputCardName = popupAddCard.querySelector('.form__input_value_card-name');
const popupAddCardInputLinkPhoto = popupAddCard.querySelector('.form__input_value_link-photo');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const popupAddCardOverlay = popupAddCard.querySelector('.popup__overlay');
const popupAddCardSubmitButton = popupAddCard.querySelector('.form__button-submit');

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

//Функции:
//Функция добавления карточек на страницу
// function addCard (name, link) {
//   const cardTemplate = page.querySelector('#cards').content;
//   const card = cardTemplate.querySelector('.card').cloneNode(true);
//   const cardTitle = card.querySelector('.card__title');
//   const cardImage = card.querySelector('.card__image');
//   const likeButton = card.querySelector('.card__like-button');
//   const cardTrash = card.querySelector('.card__trash');
//   cardTitle.textContent = name;
//   cardImage.alt = name;
//   cardImage.src = link;

//   cardImage.addEventListener('click', () => {
//     hangleClickCardImage(cardImage);
//   });

//   likeButton.addEventListener('click', () => {
//     toggleLike(likeButton);
//   });

//   cardTrash.addEventListener('click', () => {
//     removeElement(cardTrash)
//   });
//   return card;
// };
// function renderCard (container, card) {
//   container.prepend(addCard (card.name, card.link));
// };
//откртие попапа
const openPopup = (elm) => {
  elm.classList.add('popup_opened');
  page.addEventListener('keydown', handleClickEscape);
};
//закрытие попапа
const closePopup = (elm) => {
  elm.classList.remove('popup_opened');
  page.removeEventListener('keydown', handleClickEscape);
};
//зыкрытие попапа по нажатию на Escape
const handleClickEscape = (evt) => {
  if(evt.key === 'Escape') {
    const popup = page.querySelector('.popup_opened');
    closePopup(popup);
  };
};
//Функция обработчика субмита попапа редактирования профиля
const handlePopupProfileFormSubmit = (evt) => {
  evt.preventDefault();
  insertingDataProfileInput();
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
  renderCard(cardContainer, card);
  popupAddCardForm.reset();
  closePopup(popupAddCard);
  deactivateButton(popupAddCardSubmitButton, config);
};

//вставка данных в профиль из инпутов
const insertingDataProfileInput = () => {
  profileTitle.textContent = popupProfileInputName.value;
  profileSubtitle.textContent = popupProfileInputJob.value;
};


profileEditButton.addEventListener('click', handlePopupProfileOpen);
popupProfileForm.addEventListener('submit', handlePopupProfileFormSubmit);

popupProfileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupProfileOverlay.addEventListener('click', () => {
  closePopup(popupProfile);
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

popupAddCardForm.addEventListener('submit', handlePopupAddCardFormSubmit);

popupAddCardCloseButton.addEventListener('click', () => {
  closePopup(popupAddCard);
});

popupAddCardOverlay.addEventListener('click', () => {
  closePopup(popupAddCard);
});


//вставка данных в профиль при загрузке страницы
insertingDataProfileInput();
