import {page} from './index.js'

export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._popupOverlay = this._popup.querySelector('.popup__overlay');
    this._handleClickEscape = this._handleClickEscape.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    page.addEventListener('keydown', this._handleClickEscape);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    page.removeEventListener('keydown', this._handleClickEscape);
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
    this._popupOverlay.addEventListener('click', () => {
      this.close();
    })
  }

  _handleClickEscape(evt) {
    if(evt.key === 'Escape') {
      this.close()
    }
  }
}
