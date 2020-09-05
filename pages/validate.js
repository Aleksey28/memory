const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = 'Ошибка';
  errorElement.classList.remove(errorClass);
};

const showSettingsError = (formElement, errorMessage, {inputErrorClass, errorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`#${formElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideSettingsError = (formElement, {inputErrorClass, errorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`#${formElement.id}-error`);
  errorElement.textContent = 'Ошибка';
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, {...rest}) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, rest);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  };
};

const checkSettingsValidity = (formElement, inputList, {...rest}) => {
  if (!hasInvalidSettings(inputList)) {
    hideSettingsError(formElement, rest);
  } else {
    showSettingsError(formElement, "Произведение размеров нечетно. Неовзможно построить поле.", rest);
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

const hasInvalidSettings = (inputList) => {
  return inputList.reduce((res, inputElement) => res*=inputElement.value, 1) % 2 !== 0;
}

const toggleBtn = (inputList, buttonElement, {inactiveButtonClass, ...rest}) => {
  if (hasInvalidInput(inputList) || hasInvalidSettings(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleBtn(inputList, buttonElement, rest);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleBtn(inputList, buttonElement, rest);
    });
  })
}

const setEventListenersSettings = ({settingsFormSelector, settingsInputWidthSelector, settingsInputHeightSelector, submitButtonSelector, ...rest}) => {
  const formElement = document.querySelector(settingsFormSelector);
  const inputList =[];
  inputList.push(formElement.querySelector(settingsInputWidthSelector));
  inputList.push(formElement.querySelector(settingsInputHeightSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkSettingsValidity(formElement, inputList, rest);
    });
  })
}

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
  })

  setEventListenersSettings(rest);
}




enableValidation({
  formSelector: '.form',
  settingsFormSelector: '.form_type_settings',
  inputSelector: '.form__input',
  settingsInputWidthSelector: '.settings__input_type_width',
  settingsInputHeightSelector: '.settings__input_type_height',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
});
