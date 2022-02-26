const imagePopup = page.querySelector('.popup-image');
const imagePopupItem = imagePopup.querySelector('.popup-image__item');
const imagePopupTitle = imagePopup.querySelector('.popup-image__title');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');
const imagePopupOverlay = imagePopup.querySelector('.popup-image__overlay');

class Card {
  constructor(data, cardSelector){
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;

  }

  _getTemplate() {
   const cardElement = document
   .querySelector(this._cardSelector)
   .content
   .querySelector('.card')
   .cloneNode(true);

   return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button')
    .addEventListener('click', () => {
      this._toggleLikeButton();
    });

    this._element.querySelector('.card__trash')
    .addEventListener('click', () => {
      this._removeElement();
    });

    this._element.querySelector('.card__image')
    .addEventListener('click', () => {
      this._handleOpenPopup();
    });

    imagePopupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
  }

  _removeElement() {
    this._element.remove();
  }

  _toggleLikeButton() {
    this._element.querySelector('.card__like-button')
    .classList
    .toggle('card__like-button_active')
  }

  _handleOpenPopup() {
    imagePopupItem.src = this._link;
    imagePopupTitle.textContent = this._title;
    imagePopup.classList.add('popup_opened');
  }

  _handleClosePopup() {
    imagePopupItem.src = '';
    imagePopupTitle.textContent = '';
    imagePopup.classList.remove('popup_opened');
  }


}

initialCards.forEach((item) => {
  const card = new Card(item, '#card')
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement);
})

