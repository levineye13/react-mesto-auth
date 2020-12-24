import React from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';

const Register = () => {
  const markup = (
    <fieldset className="popup__info">
      <label className="popup__form-field">
        <input
          // value={values.place || ''}
          // onChange={handleInputChange}
          type="email"
          id="email-input"
          className="popup__input popup__input_theme_dark"
          name="email"
          placeholder="Email"
          required
          maxLength="30"
        />
        <span className="popup__error" id="place-input-error">
          {/* {errors.place || ''} */}
        </span>
      </label>
      <label className="popup__form-field">
        <input
          // value={values.link || ''}
          // onChange={handleInputChange}
          type="password"
          id="password-input"
          className="popup__input popup__input_theme_dark"
          name="password"
          placeholder="Пароль"
          required
        />
        <span className="popup__error" id="link-input-error">
          {/* {errors.link || ''} */}
        </span>
      </label>
    </fieldset>
  );

  const linkMarkup = (
    <Link to="/sign-in" className="popup__link">
      Уже зарегистрированы? Войти
    </Link>
  );

  return (
    <PopupWithForm
      title={'Регистрация'}
      name={'register'}
      buttonText={'Зарегистрироваться'}
      children={markup}
      isOpen={true}
      link={linkMarkup}
      hasCloseButton={false}
      //onClose={''}
      //onScreenClickClose={''}
      //onSubmit={''}
      isValid={true}
    />
  );
};

export default Register;
