class Card {
  constructor(data, cardSelector){
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._popup = page.querySelector('.popup-image');
    this._popupImage = this._popup.querySelector('.popup-image__item');
    this._popupTitle = this._popup.querySelector('.popup-image__title');
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._popupOverlay = this._popup.querySelector('.popup-image__overlay');
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

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    this._likeButton = this._element.querySelector('.card__like-button');
    this._cardTrash = this._element.querySelector('.card__trash');
    this._cardImage = this._element.querySelector('.card__image');

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._likeButton
    .addEventListener('click', () => {
      this._toggleLikeButton();
    });

    this._cardTrash
    .addEventListener('click', () => {
      this._removeElement();
    });

    this._cardImage
    .addEventListener('click', () => {
      this._handleOpenPopup();
    });

    this._popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });

    this._popupOverlay.addEventListener('click', () => {
      this._handleClosePopup();
    });
  }

  _removeElement() {
    this._element.remove();
  }

  _toggleLikeButton() {
    this._likeButton
    .classList
    .toggle('card__like-button_active')
  }

  _handleOpenPopup() {
    this._popupImage.src = this._link;
    this._popupTitle.textContent = this._title;
    this._popup.classList.add('popup_opened');
  }

  _handleClosePopup() {
    this._popupImage.src = '';
    this._popupTitle.textContent = '';
    this._popup.classList.remove('popup_opened');
  }

}

initialCards.forEach((item) => {
  const card = new Card(item, '#card')
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement);
})

