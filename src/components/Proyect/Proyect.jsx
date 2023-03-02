import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { TextContext } from '../../contexts/TextContext';

export default function Proyect(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const text = React.useContext(TextContext);

  const { proyectName, discipline, owner, proyectPic, colaborators } =
    props.proyectData;

  return (
    <div className="proyect">
      <img className="proyect__img" src={proyectPic} alt={proyectName} />
      <h3 className="proyect__name">{proyectName}</h3>
      <div className="proyect__info-container">
        <div className="proyect__info">
          <h4 className="proyect__key">{text.discipline}</h4>
          <p className="proyect__value">{discipline}</p>
        </div>
        <div className="proyect__info">
          <h4 className="proyect__key">{text.creator}</h4>
          <p className="proyect__value">{owner}</p>
        </div>
        <div className="proyect__info">
          <h4 className="proyect__key">{text.colaborators}</h4>
          <p className="proyect__value">{colaborators.length}</p>
        </div>
      </div>
    </div>
  );
}
