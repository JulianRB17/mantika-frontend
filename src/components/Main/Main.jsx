import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Proyect from '../Proyect/Proyect';
import { paginate } from './../../utils/paginate';
import Pagination from '../Pagination/Pagination';

export default function Main(props) {
  const { proyects, openPopupWithConfirmation, setSelectedProyect } = props;
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 3;

  const paginatedProyects = paginate(proyects, currentPage, pageSize);
  const totalCount = paginatedProyects.length;

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  if (proyects.length >= 1)
    return (
      <section className="main">
        {proyects.map((proyectData) => {
          return (
            <Proyect
              proyectData={proyectData}
              key={proyectData._id}
              openPopupWithConfirmation={openPopupWithConfirmation}
              setSelectedProyect={setSelectedProyect}
            />
          );
        })}
        <Link to="/proyect/create">Agregar</Link>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    );
}
