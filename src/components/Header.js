import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from './../images/header__logo.svg';

const Header = function ({ loggedIn }) {
  const location = useLocation();
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const path = location.pathname;

    const setData = (path) => {
      if (path === '/sign-in') {
        setUrl('/sign-up');
        setText('Регистрация');
      } else if (path === '/sign-up') {
        setUrl('/sign-in');
        setText('Войти');
      }
    };

    setData(path);
  }, [location]);

  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип Место" className="header__logo" />
      <Link to={loggedIn ? '/sign-in' : url} className="header__link">
        {loggedIn ? 'Выйти' : text}
      </Link>
    </header>
  );
};

export default Header;
