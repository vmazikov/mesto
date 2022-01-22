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


// функция стартового добавления карточек из массива initialCards на страницу
// function addCard () {
//     //Добавляем функцию удаления карточки через корзину
//     cardTrash.addEventListener('click', function () {
//       const cardItem = cardTrash.closest('.card');
//       cardItem.remove();
//     });
//     //Откртие попапа с увеличением картинки
//     cardImage.addEventListener('click', function () {
//       const cardImagePopup = document.querySelector('.popup-image');
//       const popupImage = cardImagePopup.querySelector('.popup-image__item');
//       const popupTitle = cardImagePopup.querySelector('.popup-image__title');
//       const closeButton = cardImagePopup.querySelector('.popup__close-button');
//       const overlay = cardImagePopup.querySelector('.popup__overlay');
//       cardImagePopup.classList.add('popup_opened');
//       popupImage.src = card.querySelector('.card__image').src;
//       popupImage.alt = card.querySelector('.card__title').textContent;
//       popupTitle.textContent = card.querySelector('.card__title').textContent;
//       //закрытие через кнопку
//       closeButton.addEventListener('click', function () {
//         cardImagePopup.classList.remove('popup_opened');
//       });
//       //закрытие через фон
//       overlay.addEventListener('click', function () {
//         cardImagePopup.classList.remove('popup_opened');
//       });
//     });
//     //Добавление карточек на страницу
//     cardContainer.append(card);
//   });
// }

// // Код для добавления попапа добавления карточек

//   //Открытие попапа
//   profileAddButton.addEventListener('click', function () {
//     popupElement.classList.add('popup_opened');
//   });
//   //Клонируем карточку при нажатии на субмит
//   formElement.addEventListener('submit',  function (evt) {
//     evt.preventDefault();
//     const cardTemplate = document.querySelector('#cards').content;
//     const card = cardTemplate.querySelector('.card').cloneNode(true);
//     const cardTitle = card.querySelector('.card__title');
//     const cardImage = card.querySelector('.card__image');
//     const cardTrash = card.querySelector('.card__trash');
//     const likeButton = card.querySelector('.card__like-button');
//     //присваеваем в карточку заполненые поля инпутов
//     cardTitle.textContent = cardNameInput.value;
//     cardImage.src = photoLinkInput.value;
//     //Добавляем функцию удаления карточки через корзину
//     cardTrash.addEventListener('click', function () {
//       const cardItem = cardTrash.closest('.card');
//       cardItem.remove();
//     });
//     //Цикл установки лайка в зависимости от текушего модификатора
//     likeButton.addEventListener('click', function () {
//       if (likeButton.classList.contains('card__like-button_active')) {
//         likeButton.classList.remove('card__like-button_active');
//       } else {
//         likeButton.classList.add('card__like-button_active');
//       }
//     });
  //   //Откртие попапа с увеличением картинки
  //   cardImage.addEventListener('click', function () {
  //     const cardImagePopup = document.querySelector('.popup-image');
  //     const popupImage = cardImagePopup.querySelector('.popup-image__item');
  //     const popupTitle = cardImagePopup.querySelector('.popup-image__title');
  //     const closeButton = cardImagePopup.querySelector('.popup__close-button');
  //     const overlay = cardImagePopup.querySelector('.popup__overlay');
  //     cardImagePopup.classList.add('popup_opened');
  //     popupImage.src = cardImage.src;
  //     popupImage.alt = cardImage.textContent;
  //     popupTitle.textContent = cardTitle.textContent;
  //     //закрытие через кнопку
  //     closeButton.addEventListener('click', function () {
  //       cardImagePopup.classList.remove('popup_opened');
  //     });
  //     //закрытие через фон
  //     overlay.addEventListener('click', function () {
  //       cardImagePopup.classList.remove('popup_opened');
  //     });
  //   });
  //   //Добавление карточку на страницу и закрытие попапа добавления карточек
  //   cardContainer.prepend(card);
  //   cardNameInput.value = '';
  //   photoLinkInput.value = '';
  //   popupElement.classList.remove('popup_opened');
  // });
  // //закрытие попапа по кнопке
  // popupCloseButton.addEventListener('click', function () {
  //   popupElement.classList.remove('popup_opened');
  // });
  // //закрытие попапа через фон
  // popupOverlay.addEventListener('click', function () {
  //   popupElement.classList.remove('popup_opened');
  // });

//доавление попапа с увеличением картинки на страницу
// function addPopupImage () {
//   const cardImagePopupTemplate = document.querySelector('#popup-image').content;
//   const cardImageElement = cardImagePopupTemplate.querySelector('.popup-image').cloneNode(true);
//   page.append(cardImageElement);
// };
// addPopupImage ()

// Попап редактирования профиля
const cardContainer = document.querySelector('.cards');

function renderCard (item) {
  const cardTemplate = document.querySelector('#cards').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const likeButton = card.querySelector('.card__like-button');
  const cardTrash = card.querySelector('.card__trash');
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;

  likeButton.addEventListener('click', () => {
    likeButtonActive(likeButton);
  });

  cardTrash.addEventListener('click', () => {
    removeElement(cardTrash)
  });
  cardContainer.prepend(card);
};

initialCards.forEach(function(initialCards) {
  renderCard (initialCards);
})

const page = document.querySelector('.page');
const profileEditButton = page.querySelector('.profile__edit-button');
const profileTitle = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const popupProfile = page.querySelector('.popup_value_profile');
const popupProfileForm = popupProfile.querySelector('.form');
const popupProfileInputName = popupProfile.querySelector('.form__item-text_value_name');
const popupProfileInputJob = popupProfile.querySelector('.form__item-text_value_job');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const popupProfileOverlay = popupProfile.querySelector('.popup__overlay');


profileTitle.textContent = popupProfileInputName.value;
profileSubtitle.textContent = popupProfileInputJob.value;

const openPopup = (elm) => {
  elm.classList.add('popup_opened');
};

const closePopup = (elm) => {
  elm.classList.remove('popup_opened');
};

const likeButtonActive = (elm) => {
  elm.classList.toggle('card__like-button_active');
};

const removeElement = (elm) => {
  const card = elm.closest('.card');
  card.remove();
}

const handlePopupProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupProfileInputName.value;
  profileSubtitle.textContent = popupProfileInputJob.value;
  closePopup (popupProfile);
};

const handlePopupProfileClose = () => {
  popupProfileInputName.value = profileTitle.textContent;
  popupProfileInputJob.value = profileSubtitle.textContent;
  closePopup (popupProfile);
};

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile)
});
popupProfileForm.addEventListener('submit', handlePopupProfileFormSubmit);

popupProfileCloseButton.addEventListener('click', handlePopupProfileClose);

popupProfileOverlay.addEventListener('click', handlePopupProfileClose);
// Попап добавления карточек
const profileAddButton = page.querySelector('.profile__add-button');
const popupAddCard = page.querySelector('.popup_value_add-card');
const popupAddCardForm = popupAddCard.querySelector('.form');
const popupAddCardInputCardName = popupAddCard.querySelector('.form__item-text_value_card-name');
const popupAddCardInputLinkPhoto = popupAddCard.querySelector('.form__item-text_value_link-photo');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const popupAddCardOverlay = popupAddCard.querySelector('.popup__overlay');

profileAddButton.addEventListener('click', () => {
  openPopup (popupAddCard)
});

const handlePopupAddCardFormSubmit = evt => {
  evt.preventDefault();
  const card = {
    name: popupAddCardInputCardName.value,
    link: popupAddCardInputLinkPhoto.value
  }
  renderCard(card);
  popupAddCardForm.reset()
  closePopup (popupAddCard);
};

popupAddCardForm.addEventListener('submit', handlePopupAddCardFormSubmit)

popupAddCardCloseButton.addEventListener('click', () => {
  popupAddCardForm.reset()
  closePopup (popupAddCard);
});

popupAddCardOverlay.addEventListener('click', () => {
  popupAddCardForm.reset()
  closePopup (popupAddCard);
});
