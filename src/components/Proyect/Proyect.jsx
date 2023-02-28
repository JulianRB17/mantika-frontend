import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { TextContext } from '../../contexts/TextContext';

export default function Proyect() {
  const currentUser = React.useContext(CurrentUserContext);
  const text = React.useContext(TextContext);

  return (
    <div className="proyect">
      <img
        className="proyect__img"
        src={currentUser.img}
        alt={currentUser.name}
      />
      <h3 className="proyect__name">Los obscenos</h3>
      <div className="proyect__info-container">
        <div className="proyect__info">
          <h4 className="proyect__key">{text.discipline}</h4>
          <p className="proyect__value">la teatra</p>
        </div>
        <div className="proyect__info">
          <h4 className="proyect__key">{text.creator}</h4>
          <p className="proyect__value">yo</p>
        </div>
        <div className="proyect__info">
          <h4 className="proyect__key">{text.colaborators}</h4>
          <p className="proyect__value">0</p>
        </div>
      </div>
    </div>
  );
}
