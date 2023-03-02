import React from 'react';
import { Link } from 'react-router-dom';
import Proyect from '../Proyect/Proyect';

export default function Main(props) {
  const { proyects } = props;

  if (proyects.length >= 1)
    return (
      <section className="main">
        {proyects.map((proyectData) => {
          return <Proyect proyectData={proyectData} key={proyectData._id} />;
        })}
        <Link to="/proyect/register">Agregar</Link>
      </section>
    );
}
