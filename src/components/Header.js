import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { signIn, signUp } from '../utils/constants.js';
import headerLogo from './../images/header__logo.svg';

const Header = function ({ loggedIn, setLoggedIn, email }) {
  const { pathname: path } = useLocation();
  const history = useHistory();
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  const signOut = () => {
    setLoggedIn(false);
    history.push(signIn);
  };

  useEffect(() => {
    const setData = (path) => {
      if (path === signIn) {
        setText('Регистрация');
        setUrl(signUp);
      } else if (path === signUp) {
        setText('Войти');
        setUrl(signIn);
      }
    };

    setData(path);
  }, [path]);

  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип Место" className="header__logo" />
      <ul className="header__list">
        <li className="header__item">
          <p className="header__email">{loggedIn && email}</p>
        </li>
        <li className="header__item">
          {!loggedIn ? (
            <Link to={url} className="header__link">
              {text}
            </Link>
          ) : (
            <button className="header__button" onClick={signOut} type="button">
              Выйти
            </button>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
