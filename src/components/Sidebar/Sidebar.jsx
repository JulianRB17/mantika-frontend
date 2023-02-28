import React from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../../images/hip-hop-dance.jpg';

export default function Sidebar(props) {
  const { text, user } = props;
  const {
    username,
    city,
    description,
    createdProyects,
    colaboratingIn,
    profilePic,
    discipline,
    userId,
  } = user;

  console.log(user);

  return (
    <section className="sidebar">
      <img
        src={profilePic ? profilePic : profileImg}
        alt="Imagen de perfil"
        className="sidebar__profile-img"
      />
      <h1 className="sidebar__user-name">{username ? username : '-'}</h1>
      <div className="sidebar__info-container">
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.discipline}</h2>
          <p className="sidebar__info-value">{discipline ? discipline : '-'}</p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.city}</h2>
          <p className="sidebar__info-value">{city ? city : '-'}</p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.description}</h2>
          <p className="sidebar__info-value">
            {description ? description : '-'}
          </p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.createdProyects}</h2>
          <p className="sidebar__info-value">
            {createdProyects ? createdProyects : '-'}
          </p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.colaboratingIn}</h2>
          <p className="sidebar__info-value">{`${
            colaboratingIn ? colaboratingIn : ''
          } ${text.proyectsCountText}`}</p>
        </div>
      </div>
      <Link to={`../users/${userId}`}>Edit</Link>
      <button>My proyects</button>
    </section>
  );
}
