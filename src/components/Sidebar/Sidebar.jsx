import React from 'react';
import profileImg from '../../images/hip-hop-dance.jpg';

export default function Sidebar() {
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
          <h2 className="sidebar__info-key">Disciplina:</h2>
          <p className="sidebar__info-value">Teatro</p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">Ciudad:</h2>
          <p className="sidebar__info-value">Ciudad de México, México</p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">About:</h2>
          <p className="sidebar__info-value">
            Teatrero que se pregunta y crea desde el concepto del erotismo.
          </p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">Proyectos creados:</h2>
          <p className="sidebar__info-value">5</p>
        </div>
        <div className="sidebar__info-element">
          <h2 className="sidebar__info-key">Colaborando en:</h2>
          <p className="sidebar__info-value">3 proyectos</p>
        </div>
      </div>
    </section>
  );
}
