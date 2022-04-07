export default class Card {
  constructor(data, cardSelector, handleCardClick, userId, handleCardTrashClick, handleLikeClick){
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    //определяем переменные для работы с попапом открытия картинки в больший размер
    this._handleCardClick = handleCardClick;
    this._handleCardTrashClick = handleCardTrashClick;
    this._handleLikeClick = handleLikeClick;
  };
  //Получение темплейта карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  };
  //Генерация карточки
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    this._likeButton = this._element.querySelector('.card__like-button');
    this._cardTrash = this._element.querySelector('.card__trash');



    if(this._ownerId !== this._userId) {
      this._cardTrash.classList.add('card__trash_hidden');
    }

    this.setLikes(this._likes)
    this._setEventListeners();
    return this._element;
  };

  setLikes(newLike) {
    this._likes = newLike;
    const likeNumber = this._element.querySelector('.card__like-number');
    likeNumber.textContent = this._likes.length;

    if(this.isLiked()) {
      this._likeButton.classList.add('card__like-button_active')
    } else {
      this._likeButton.classList.remove('card__like-button_active')
    }
  }

  isLiked() {
    const likeCountElement = this._likes.find(user => user._id === this._userId)
    return likeCountElement
  }

  //Вешаем слушатели на карточку
  _setEventListeners() {
    //Слушатель нажатия на лайк
    this._likeButton
    .addEventListener('click', () => {
      this._handleLikeClick(this._id)
    });
    //Нажатие на корзину
    this._cardTrash
    .addEventListener('click', () => {
      this._handleCardTrashClick(this._id)
    });
    //Нажатие на картинку, для открытия попапа
    this._cardImage
    .addEventListener('click', this._handleCardClick);
  };
  //Удаление карточки
  removeElement() {
    this._element.remove();
  };

  //Постановка и удаление лайка
  _toggleLikeButton() {
    this._likeButton
    .classList
    .toggle('card__like-button_active')
  };

};
