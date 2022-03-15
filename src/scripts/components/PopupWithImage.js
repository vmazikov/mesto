import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImage = popup.querySelector('.popup-image__item');
    this._popupTitle = popup.querySelector('.popup-image__title');
  }
  open(data) {
    super.open();
    this._popupImage.src = data.link;
    this._popupImage.alt = data.title;
    this._popupTitle.textContent = data.title;
  }
}
