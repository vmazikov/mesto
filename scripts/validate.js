//Конфиг для валидации
const config = {
  errorInputText: 'form__input_type_error',
  inputTextClass: '.form__input',
  errorInputSpan: 'form__input-error_active',
  buttonSubmit: '.form__button-submit',
  buttonSubmitDisabled: 'form__button-submit_disabled',
};
//Функция показа ошибки
const showErrorInput = (formItem, inputItem, errorMessage) => {
  const inputError = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.add(config.errorInputText);
  inputError.textContent = errorMessage;
  inputError.classList.add(config.errorInputSpan);
};
//Функция скрытия ошибки
const hideErrorInput = (formItem, inputItem) => {
  const inputError = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.remove(config.errorInputText);
  inputError.textContent = ' ';
  inputError.classList.remove(config.errorInputSpan);
};
//Проверка валидности полей заполнения
const checkInputValidity = (formItem, inputItem) => {
  if (!inputItem.validity.valid) {
    showErrorInput(formItem, inputItem, inputItem.validationMessage);
  } else {
    hideErrorInput(formItem, inputItem);
  };
};
//Вешаем слушатели на инпуты
const setEventListeners = (formItem) => {
  const inputList = Array.from(formItem.querySelectorAll(config.inputTextClass));
  const button = formItem.querySelector(config.buttonSubmit);
  toggleButton(inputList, button);
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      checkInputValidity(formItem, inputItem);
      toggleButton(inputList, button);
    });
  });
};
//Проверка валидности формы
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
//Возврат валидности полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputItem) => {
    return !inputItem.validity.valid;
  });
};
//Переключение Кнопки
const toggleButton = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    deactivateButton(button);
  } else {
    activateButton(button);
  };
};
//Активация кнопки
const activateButton = (button) => {
  button.classList.remove(config.buttonSubmitDisabled);
  button.removeAttribute('disabled');
};
//Деактивация кнопки
const deactivateButton = (button) => {
  button.classList.add(config.buttonSubmitDisabled);
  button.setAttribute('disabled', '');
};
enableValidation();
