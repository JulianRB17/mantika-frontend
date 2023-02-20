// import React from 'react';
// import proyectPic from '../../images/ballet.jpg';

// export default function Proyect() {
//   const proyect = {
//     name: 'Los obscenos de Silere/Vórtex',
//     discipline: 'Teatro',
//     city: 'Ciuda de Méx',
//     colaborators: [1, 2, 3, 4, 5, 6, 7, 8],
//     description:
//       ' Una obra de ciencia fición que a partir de colocar a los personajes en situaciones límite que sólo pueden existir en estas narrativas: la ruptura del tiempo, el conocer quién sería yo si mi situación de vida sería otra, ser un ser no humano que busca su identidad humana por mencionar algunas, detona preguntas básicas sobre nuestra monstruosidad, sobre el sentido de nuestra vida, nuestra identidad, todo esto desde una estética profundamente atractiva y llamativa. ¿Por qué estoy vivx?',
//     img: proyectPic,
//     owner: 'El Julis',
//   };

//   return (
//     <section className="proyect">
//       <img
//         src={proyect.img}
//         alt="Imagen de perfil"
//         className="proyect__profile-img"
//       />
//       <h1 className="proyect__name">{proyect.name}</h1>
//       <div className="proyect__info-container">
//         <div className="proyect__info-element">
//           <h2 className="proyect__info-key">Disciplina:</h2>
//           <p className="proyect__info-value">{proyect.discipline}</p>
//         </div>
//         <div className="proyect__info-element">
//           <h2 className="proyect__info-key">Ciudad:</h2>
//           <p className="proyect__info-value">{proyect.city}</p>
//         </div>
//         <div className="proyect__info-element">
//           <h2 className="proyect__info-key">About:</h2>
//           <p className="proyect__info-value">{proyect.description}</p>
//         </div>
//         <div className="proyect__info-element">
//           <h2 className="proyect__info-key">Creator:</h2>
//           <p className="proyect__info-value">{proyect.owner}</p>
//         </div>
//       </div>
//     </section>
//   );
// }

import React from 'react';

export default function Proyect(props) {
  const { id, img, name, discipline, creator, year, colaborators } = props;

  return (
    <div className="proyect">
      <img className="proyect__img" src={img} alt={name} />
      <h3 className="proyect__name">{name}</h3>
      <div className="proyect__info-container">
        <div className="proyect__info">
          <h4 className="proyect__key">Discipline;</h4>
          <p className="proyect__value">{discipline}</p>
        </div>
        <div className="proyect__info">
          <h4 className="proyect__key">Creator:</h4>
          <p className="proyect__value">{creator}</p>
        </div>
        <div className="proyect__info">
          <h4 className="proyect__key">Year:</h4>
          <p className="proyect__value">{year}</p>
        </div>
        <div className="proyect__info">
          <h4 className="proyect__key">Colaborators:</h4>
          <p className="proyect__value">{colaborators.length}</p>
        </div>
      </div>
    </div>
  );
}
