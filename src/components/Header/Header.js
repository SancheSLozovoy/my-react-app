import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';
import main from './HomePage.svg';
import acc from './Account.png';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/main"><img src={main} alt="Главная" /></Link></li>
          <li><Link to="/profile"><img src={acc} alt="Профиль" /></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
