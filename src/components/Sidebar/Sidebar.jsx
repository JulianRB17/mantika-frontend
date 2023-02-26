import React from 'react';
import profileImg from '../../images/hip-hop-dance.jpg';

export default function Sidebar(props) {
  const { text } = props;

  return (
    <section className="sidebar">
      <img
        src={profileImg}
        alt="Imagen de perfil"
        className="sidebar__profile-img"
      />
      <h1 className="sidebar__user-name">Nombre genérico muy largo</h1>
      <div className="sidebar__info-container">
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.discipline}</h2>
          <p className="sidebar__info-value">Teatro</p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.city}</h2>
          <p className="sidebar__info-value">Ciudad de México, México</p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.description}</h2>
          <p className="sidebar__info-value">
            Teatrero que se pregunta y crea desde el concepto del erotismo.
          </p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.createdProyects}</h2>
          <p className="sidebar__info-value">5</p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">{text.colaboratingIn}</h2>
          <p className="sidebar__info-value">{`2 ${text.proyectsCountText}`}</p>
        </div>
      </div>
      <button>Edit</button>
      <button>My proyects</button>
    </section>
  );
}
