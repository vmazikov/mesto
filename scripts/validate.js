const config = {
  errorInputClass : 'form__input_type_error',
}


//Функция показа ошибки
const showErrorInput = (formItem, inputItem, errorMessage) => {
  const inputError = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.add('form__input_type_error');
  inputError.textContent = errorMessage;
  inputError.classList.add('form__input-error_active');
};
//Функция скрытия ошибки
const hideErrorInput = (formItem, inputItem) => {
  const inputError = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.remove('form__input_type_error');
  inputError.textContent = ' ';
  inputError.classList.remove('form__input-error_active');
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
  const inputList = Array.from(formItem.querySelectorAll('.form__input'));
  const button = formItem.querySelector('.form__button-submit');
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

const activateButton = (button) => {
  button.classList.remove('form__button-submit_disabled');
  button.removeAttribute('disabled');
};

const deactivateButton = (button) => {
  button.classList.add('form__button-submit_disabled');
  button.setAttribute('disabled', '');
};

enableValidation();
