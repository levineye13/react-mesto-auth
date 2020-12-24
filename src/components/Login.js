import React from 'react';
import PopupWithForm from './PopupWithForm';

const Login = () => {
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

  return (
    <PopupWithForm
      title={'Вход'}
      name={'login'}
      buttonText={'Войти'}
      children={markup}
      isOpen={true}
      link={null}
      hasCloseButton={false}
      //onClose={''}
      //onScreenClickClose={''}
      //onSubmit={''}
      isValid={true}
    />
  );
};

export default Login;
