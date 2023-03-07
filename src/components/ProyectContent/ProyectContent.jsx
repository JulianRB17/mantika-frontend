import React from 'react';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import defaultImg from '../../images/default.jpg';
import { TextContext } from './../../contexts/TextContext';

export default function UserContent(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const text = React.useContext(TextContext);
  const {
    elements,
    onEdit,
    onColaborate,
    disciplines,
    openPopupWithConfirmation,
    onGetProyect,
    setSelectedProyect,
  } = props;
  const { id } = useParams();
  const [isMine, setIsMine] = React.useState(false);
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    (async function () {
      const proyectData = await onGetProyect(id);
      console.log(proyectData);
      setData(proyectData);
      if (proyectData.owner === currentUser._id) {
        setIsMine(true);
        setSelectedProyect(proyectData._id);
      } else {
        setIsMine(false);
      }
    })();
  }, [id]);

  function handleEdit(e) {
    e.preventDefault();
    onEdit(id);
  }

  function handleColaborate(e) {
    e.preventDefault();
    onColaborate(id);
  }

  const handleDelete = function (e) {
    e.preventDefault();
    openPopupWithConfirmation();
  };

  function valuesRenderer(element) {
    if (element.value === 'colaborators') {
      return `${data[element.value].length} proyectos`;
    }
    if (data[element.value]) {
      return data[element.value];
    }
    return '-';
  }

  function btnRenderer() {
    if (isMine) {
      return (
        <button className="proyect-content__submit-btn" onClick={handleEdit}>
          {text.editBtn}
        </button>
      );
    } else {
      return (
        <button
          className="proyect-content__submit-btn"
          onClick={handleColaborate}
        >
          {text.colaborateBtn}
        </button>
      );
    }
  }

  function disciplineRenderer(element) {
    return (
      <select
        required
        className="proyect-content__input proyect-content__info-value"
        name="discipline"
        key={elements.indexOf(element)}
        onChange={element.onChange}
        defaultValue={data.discipline}
        placeholder={data.discipline}
      >
        {disciplines.map((discipline) => {
          return (
            <option value={discipline} key={disciplines.indexOf(discipline)}>
              {discipline}
            </option>
          );
        })}
      </select>
    );
  }
  function largeInputRenderer(element) {
    return (
      <textarea
        className={`proyect-content__info-value proyect-content__input ${
          element.modifier || ''
        }`}
        placeholder={data[element.value]}
        onChange={element.onChange}
      />
    );
  }
  const inputRenderer = function (element) {
    return (
      <input
        className={`proyect-content__info-value proyect-content__input ${
          element.modifier || ''
        }`}
        placeholder={data[element.value]}
        onChange={element.onChange}
      />
    );
  };
  function paragraphRenderer(element) {
    return (
      <p className={`proyect-content__info-value ${element.modifier || ''}`}>
        {valuesRenderer(element)}
      </p>
    );
  }

  function elementRenderer(element) {
    if (isMine && element.isInput && element.isLarge) {
      return largeInputRenderer(element);
    }
    if (isMine && element.isInput) {
      return inputRenderer(element);
    }
    if (element.value === 'discipline' && isMine) {
      return disciplineRenderer(element);
    } else {
      return paragraphRenderer(element);
    }
  }
  return (
    <form className="proyect-content">
      <button
        className={`proyect-content__trash-btn ${isMine || 'hidden'}`}
        onClick={handleDelete}
      />
      <img
        src={data.proyectPic || defaultImg}
        alt="Imagen de perfil"
        className="proyect-content__profile-img"
      />
      <div className="proyect-content__info-container">
        {elements.map((element) => {
          return (
            <div
              className="proyect-content__info-element"
              key={elements.indexOf(element)}
            >
              <h2 className="proyect-content__info-key">{element.title}</h2>
              {elementRenderer(element)}
            </div>
          );
        })}
      </div>
      {btnRenderer()}
    </form>
  );
}
