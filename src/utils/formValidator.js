class FormValidator {
  constructor(config) {
    this._config = config;
  }

  _showInputError(formElement, inputElement, validationMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(`${this._config.errorMessage}_visible`);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(`${this._config.errorMessage}_visible`);
    errorElement.textContent = '';
  }

  _handleCheckInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return Array.from(inputList).some(
      (currentInput) => !currentInput.validity.valid
    );
  }

  _handleToggleButtonSubmit(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.setAttribute('disabled', '');
      submitButton.classList.add(this._config.buttonInactive);
    } else {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove(this._config.buttonInactive);
    }
  }

  _setEventListeners(formElement, inputList, submitButton) {
    this._handleToggleButtonSubmit(inputList, submitButton);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleCheckInputValidity(formElement, inputElement);
        this._handleToggleButtonSubmit(inputList, submitButton);
      });
    });
  }

  enableValidation() {
    const formList = document.querySelectorAll(this._config.formSelector);
    formList.forEach((formElement) => {
      const inputList = formElement.querySelectorAll(
        this._config.inputSelector
      );
      const submitButton = formElement.querySelector(
        this._config.submitButtonSelector
      );

      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleToggleButtonSubmit(inputList, submitButton);
      });

      this._setEventListeners(formElement, inputList, submitButton);
    });
  }
}

const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  errorMessage: 'popup__error',
  buttonInactive: 'button_inactive',
};

const validator = new FormValidator(validatorConfig);

export { validator };
