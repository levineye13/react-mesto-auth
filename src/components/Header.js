import React from 'react';
import headerLogo from './../images/header__logo.svg';

const Header = function () {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип Место" className="header__logo" />
    </header>
  );
};

export default Header;
