import React from 'react';
import { NavLink } from 'react-router-dom';
import searchIcon from '../../images/search-icon.svg';

export default function Navigation(props) {
  const { isAuthorized, username, searchInput, onChange, onLogout } = props;

  function handleLogout(e) {
    e.preventDefault();
    onLogout();
  }

  if (isAuthorized) {
    return (
      <section className="navigation">
        <div className="navigation__searchbar-container">
          <input
            type="search"
            placeholder="Search proyect"
            onChange={onChange}
            value={searchInput}
            className="navigation__searchbar"
          />
          <img
            src={searchIcon}
            className="navigation__btn"
            alt="nagigation lookup icon"
          />
        </div>
        <div className="navigation__links-container">
          <NavLink className="navigation__link" to="/home">
            Home
          </NavLink>
          <NavLink className="navigation__link" to="/about">
            About us
          </NavLink>
          <NavLink className="navigation__link" to="/users/me">
            {username}
          </NavLink>
          <button className="navigation__link" to="/" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    );
  } else {
    return (
      <section className="navigation">
        <div className="navigation__links-container">
          <NavLink className="navigation__link" to="/">
            Home
          </NavLink>
          <NavLink className="navigation__link" to="/about">
            About us
          </NavLink>
          <NavLink className="navigation__link" to="/login">
            Login
          </NavLink>
          <NavLink className="navigation__link" to="/register">
            Register
          </NavLink>
        </div>
      </section>
    );
  }
}
