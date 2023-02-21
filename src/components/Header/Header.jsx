import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  const { isLoggedIn, username } = props;

  return (
    <section className="header">
      <Link to="/about" className="header__logo-container">
        <img className="header__logo" src={logo} alt="logo" />
        <h1 className="header__title">Mantika</h1>
      </Link>
      <Navigation isLoggedIn={isLoggedIn} username={username} />
    </section>
  );
}
