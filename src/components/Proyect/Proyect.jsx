import React from 'react';

export default function Proyect(props) {
  const { id, img, name, discipline, creator, colaborators, text } = props;

  return (
    <div className="proyect">
      <img className="proyect__img" src={img} alt={name} />
      <h3 className="proyect__name">{name}</h3>
      <div className="proyect__info-container">
        <div className="proyect__info">
          <h4 className="proyect__key">{text.discipline}</h4>
          <p className="proyect__value">{discipline}</p>
        </div>
        <div className="proyect__info">
          <h4 className="proyect__key">{text.creator}</h4>
          <p className="proyect__value">{creator}</p>
        </div>
        <div className="proyect__info">
          <h4 className="proyect__key">{text.colaborators}</h4>
          <p className="proyect__value">{colaborators.length}</p>
        </div>
      </div>
    </div>
  );
}
