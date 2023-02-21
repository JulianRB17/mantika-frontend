import React from 'react';
import { NavLink } from 'react-router-dom';
import searchIcon from '../../images/search-icon.svg';

export default function Navigation(props) {
  const { isLoggedIn, username } = props;
  const [searchInput, setSearchInput] = React.useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (isLoggedIn) {
    console.log(username);
    return (
      <section className="navigation">
        <div className="navigation__searchbar-container">
          <input
            type="search"
            placeholder="Search proyect"
            onChange={handleChange}
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
          <NavLink className="navigation__link" to="/">
            Logout
          </NavLink>
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
