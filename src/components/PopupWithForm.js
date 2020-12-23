import React from 'react';
import ReactDOM from 'react-dom';

const PopupWithForm = React.memo(function (props) {
  const modalElement = document.getElementById('modal');

  return ReactDOM.createPortal(
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? 'popup_opened' : ''
      }`}
      onClick={props.onScreenClickClose}
    >
      <div className="popup__wrapper">
        <button
          className="popup__close-button button"
          onClick={props.onClose}
          type="button"
        />
        <form
          action="#"
          id={props.name}
          className="popup__form"
          name={`popup-${props.name}`}
          onSubmit={props.onSubmit}
          noValidate
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            className={`popup__save-button button ${
              props.isValid ? '' : 'button_inactive'
            }`}
            type="submit"
            disabled={!props.isValid}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>,
    modalElement
  );
});

export default PopupWithForm;
