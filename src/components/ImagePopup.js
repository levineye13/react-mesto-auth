import React from 'react';
import ReactDOM from 'react-dom';

const ImagePopup = function ({ card, onClose, onScreenClickClose }) {
  const modalElement = document.getElementById('modal');

  return ReactDOM.createPortal(
    <section
      className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}
      onClick={onScreenClickClose}
    >
      <div className="popup__wrapper popup__wrapper_type_image">
        <button
          className={card && 'popup__close-button button'}
          onClick={onClose}
        />
        <figure className="popup__img-container">
          <img
            src={card && card.link}
            alt={card && card.name}
            className="popup__card-img"
          />
          <figcaption className="popup__title-img">
            {card && card.name}
          </figcaption>
        </figure>
      </div>
    </section>,
    modalElement
  );
};

export default ImagePopup;
