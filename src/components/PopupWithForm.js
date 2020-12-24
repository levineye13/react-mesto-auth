import React from 'react';
import ReactDOM from 'react-dom';

const PopupWithForm = ({
  title,
  name,
  buttonText,
  children,
  isOpen,
  onClose,
  onScreenClickClose,
  onSubmit,
  isValid,
}) => {
  const modalElement = document.getElementById('modal');

  return ReactDOM.createPortal(
    <section
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={onScreenClickClose}
    >
      <div className="popup__wrapper">
        <button
          className="popup__close-button button"
          onClick={onClose}
          type="button"
        />
        <form
          action="#"
          id={name}
          className="popup__form"
          name={`popup-${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className={`popup__save-button button ${
              isValid ? '' : 'button_inactive'
            }`}
            type="submit"
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>,
    modalElement
  );
};

export default PopupWithForm;
