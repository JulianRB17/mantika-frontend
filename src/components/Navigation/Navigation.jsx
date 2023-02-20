import React from 'react';
import { NavLink } from 'react-router-dom';
import searchIcon from '../../images/search-icon.svg';

export default function Navigation(props) {
  const { isLoggedIn } = props;
  const [searchInput, setSearchInput] = React.useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (isLoggedIn) {
    return (
      <section className="navigation">
        <input
          type="search"
          placeholder="Search proyect"
          onChange={handleChange}
          value={searchInput}
          className="navigation__search-bar"
        />
        <img
          src={searchIcon}
          className="navigation__btn"
          alt="nagigation lookup icon"
        />
        <NavLink className="navigation__link" to="/">
          Home
        </NavLink>
        <NavLink className="navigation__link" to="/about">
          About us
        </NavLink>
        <NavLink className="navigation__link" to="/">
          Logout
        </NavLink>
      </section>
    );
  } else {
    return (
      <section className="navigation">
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
      </section>
    );
  }
}
