export default class Card {
  constructor(data, cardSelector, handleCardClick){
    this._title = data.name;
    this._link = data.link;
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

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    this._likeButton = this._element.querySelector('.card__like-button');
    this._cardTrash = this._element.querySelector('.card__trash');
    this._cardImage = this._element.querySelector('.card__image');

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
};
