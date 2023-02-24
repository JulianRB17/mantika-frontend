import React from 'react';
import pic from '../../images/graffiti.jpg';
import Proyect from '../Proyect/Proyect';

const proyects = [
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    creator: 'El Julián',
    _id: 1,
  },
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    creator: 'El Julián',
    _id: 2,
  },
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    creator: 'El Julián',
    _id: 3,
  },
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    creator: 'El Julián',
    _id: 4,
  },
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    creator: 'El Julián',
    _id: 5,
  },
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    creator: 'El Julián',
    _id: 6,
  },
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    creator: 'El Julián',
    _id: 7,
  },
];

export default function Main(props) {
  const { text } = props;

  return (
    <section className="main">
      {proyects.map((proyect) => {
        const { _id, img, name, discipline, creator, colaborators } = proyect;
        return (
          <Proyect
            text={text}
            name={name}
            key={_id}
            img={img}
            id={_id}
            discipline={discipline}
            creator={creator}
            colaborators={colaborators}
          />
        );
      })}
    </section>
  );
}
