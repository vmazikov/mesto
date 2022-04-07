import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popup, {formSubmitCallBack}) {
    super(popup);
    this._formSubmitCallBack = formSubmitCallBack;
    this._formSubmit = this._formSubmit.bind(this);
    this._form = this._popup.querySelector('.form');
    this._inputs = Array.from(this._form.querySelectorAll('.form__input'));
    this._submitButton = this._form.querySelector('.form__button-submit');
    this._submitButtonText = this._submitButton.textContent;
  }

  _formSubmit(evt) {
    evt.preventDefault();
    this._formSubmitCallBack(this._getInputValues());
    this._form.reset();
  }

  _getInputValues() {
    const data = {};
    this._inputs.forEach((element) => {
      data[element.name] = element.value;
    });
    return data;
  };

  cardDeleteSubmit(newSubmit) {
    this._formSubmitCallBack = newSubmit;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmit);
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Сохранение ...';
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
