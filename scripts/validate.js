const formElement = document.querySelector('.form-add-card');
const formInput = formElement.querySelector('.form__input-text');
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showError = (input, errorMessage) => {
  input.classList.add('form__input-text_type_error');
  formError.classList.add('form__input-error_active');
  formError.textContent = errorMessage;
};

const checkInputValidity = () => {
  if(!formInput.validity.valid) {
    showError(formInput, formInput.validationMessage);
  } else {
    hideError(formInput);
  }
};

const hideError = (input) => {
  input.classList.remove('form__input-text_type_error');
  formError.classList.remove('form__input-error_active');
  formError.textContent = '';
};

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});
