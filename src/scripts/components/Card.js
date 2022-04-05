export default class Card {
  constructor(data, cardSelector, handleCardClick){
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    //определяем переменные для работы с попапом открытия картинки в больший размер
    this._handleCardClick = handleCardClick;
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
    this._like = this._element.querySelector('.card__like-number');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._like.textContent = this._likes.length;

    this._likeButton = this._element.querySelector('.card__like-button');
    this._cardTrash = this._element.querySelector('.card__trash');

    this._setEventListeners();
    return this._element;
  };
  //Вешаем слушатели на карточку
  _setEventListeners() {
    //Слушатель нажатия на лайк
    this._likeButton
    .addEventListener('click', () => {
      this._toggleLikeButton();
    });
    //Нажатие на корзину
    this._cardTrash
    .addEventListener('click', () => {
      this._removeElement();
    });
    //Нажатие на картинку, для открытия попапа
    this._cardImage
    .addEventListener('click', this._handleCardClick);
  };
  //Удаление карточки
  _removeElement() {
    this._element.remove();
  };
  //Постановка и удаление лайка
  _toggleLikeButton() {
    this._likeButton
    .classList
    .toggle('card__like-button_active')
  };

  _setLikes() {

  }
};
