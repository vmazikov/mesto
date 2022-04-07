import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup{
  constructor(popup, {formSubmitCallBack}) {
    super(popup);
    this._formSubmitCallBack = formSubmitCallBack;
    this._form = this._popup.querySelector('.form')
    this._formSubmit = this._formSubmit.bind(this);
    this._submitButton = this._form.querySelector('.form__button-submit');
    this._submitButtonText = this._submitButton.textContent;
  }

  open() {
    super.open()
  }

  close() {
    super.close()
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._formSubmit)
  }

  cardDeleteSubmit(newSubmit) {
    this._formSubmitCallBack = newSubmit;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Сохранение ...';
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  _formSubmit(evt) {
    evt.preventDefault();
    this._formSubmitCallBack();
  }
}

