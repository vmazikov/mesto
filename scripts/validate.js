//Конфиг для валидации
const config = {
  errorInputText: 'form__input_type_error',
  inputTextClass: '.form__input',
  errorInputSpan: 'form__input-error_active',
  buttonSubmit: '.form__button-submit',
  buttonSubmitDisabled: 'form__button-submit_disabled',
  forms: '.form',
};
//Функция показа ошибки
const showErrorInput = (formItem, inputItem, errorMessage, config) => {
  const inputError = formItem.querySelector(`.${inputItem.id}-error`);
  inputError.textContent = errorMessage;
  inputItem.classList.add(config.errorInputText);
  inputError.classList.add(config.errorInputSpan);
};
//Функция скрытия ошибки
const hideErrorInput = (formItem, inputItem, config) => {
  const inputError = formItem.querySelector(`.${inputItem.id}-error`);
  inputError.textContent = ' ';
  inputItem.classList.remove(config.errorInputText);
  inputError.classList.remove(config.errorInputSpan);
};
//Проверка валидности полей заполнения
const checkInputValidity = (formItem, inputItem) => {
  if (!inputItem.validity.valid) {
    showErrorInput(formItem, inputItem, inputItem.validationMessage, config);
  } else {
    hideErrorInput(formItem, inputItem, config);
  };
};
//Вешаем слушатели на инпуты
const setEventListeners = (formItem, config) => {
  const inputList = Array.from(formItem.querySelectorAll(config.inputTextClass));
  const button = formItem.querySelector(config.buttonSubmit);
  toggleButton(inputList, button, config);
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      checkInputValidity(formItem, inputItem);
      toggleButton(inputList, button, config);
    });
  });
};
//Проверка валидности формы
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.forms));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};
//Возврат валидности полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputItem) => {
    return !inputItem.validity.valid;
  });
};
//Переключение Кнопки
const toggleButton = (inputList, button, config) => {
  if (hasInvalidInput(inputList)) {
    deactivateButton(button, config);
  } else {
    activateButton(button, config);
  };
};
//Активация кнопки
const activateButton = (button, config) => {
  button.classList.remove(config.buttonSubmitDisabled);
  button.removeAttribute('disabled');
};
//Деактивация кнопки
const deactivateButton = (button, config) => {
  button.classList.add(config.buttonSubmitDisabled);
  button.setAttribute('disabled', '');
};
enableValidation(config);
