import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signIn, signUp } from '../utils/constants.js';
import headerLogo from './../images/header__logo.svg';

const Header = function ({ loggedIn }) {
  const location = useLocation();
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const path = location.pathname;

    const setData = (path) => {
      if (path === signIn) {
        setUrl(signUp);
        setText('Регистрация');
      } else if (path === signUp) {
        setUrl(signIn);
        setText('Войти');
      }
    };

    setData(path);
  }, [location.pathname]);

  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип Место" className="header__logo" />
      <Link to={loggedIn ? signIn : url} className="header__link">
        {loggedIn ? 'Выйти' : text}
      </Link>
    </header>
  );
};

export default Header;
