import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';

export default function landing() {
  return (
    <section className="landing">
      <img
        className="landing__logo landing__animation"
        src={logo}
        alt="Mantika logo"
      />
      <h1 className="landing__title landing__animation">Mantika</h1>
      <h2 className="landing__subtitle landing__animation">
        A place to share your creative experience.
      </h2>
      <p className="landing__paragraph landing__animation">
        We welcome all kinds of arts: from design to dance, from music to
        drawing, from theater to interdisciplinary arts.
      </p>
      <p className="landing__paragraph landing__animation">
        We're eager to hear your creative voice, your thoughts and questions,
        your ambitions. We're not alone.
      </p>
      <div className="landing__btn-container landing__animation">
        <Link className="landing__btn" to="/register">
          Register
        </Link>
        <Link className="landing__btn" to="/login">
          Login
        </Link>
      </div>
    </section>
  );
}
