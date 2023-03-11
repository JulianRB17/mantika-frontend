import React from 'react';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import defaultImg from '../../images/default.jpg';
import { TextContext } from './../../contexts/TextContext';
import api from '../../utils/api';

export default function UserContent(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const text = React.useContext(TextContext);
  const {
    elements,
    onEdit,
    onColaborate,
    disciplines,
    openPopupWithConfirmation,
    setSelectedProyect,
  } = props;
  const { id } = useParams();
  const [isMine, setIsMine] = React.useState(false);
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    (async function () {
      const proyectData = await api.getProyect(id);
      setData(proyectData);
      if (proyectData.owner === currentUser._id) {
        setIsMine(true);
        setSelectedProyect(proyectData._id);
      } else {
        setIsMine(false);
      }
    })();
  }, [id, currentUser._id, setSelectedProyect]);

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
    const { name } = element;
    if (name === 'colaborators' && data[name]) {
      return `${data[name].length} proyectos`;
    }
    if (data[name]) {
      return data[name];
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
    const { onChange } = element;
    return (
      <select
        required
        className="proyect-content__input proyect-content__info-value"
        name="discipline"
        key={elements.indexOf(element)}
        onChange={onChange}
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
    const { name, modifier, onChange } = element;
    return (
      <textarea
        className={`proyect-content__info-value proyect-content__input ${
          modifier || ''
        }`}
        placeholder={data[name]}
        onChange={onChange}
        name={name}
      />
    );
  }

  const inputRenderer = function (element) {
    const { name, modifier, onChange } = element;
    return (
      <input
        className={`proyect-content__info-value proyect-content__input ${
          modifier || ''
        }`}
        placeholder={data[name]}
        onChange={onChange}
        name={name}
      />
    );
  };

  function paragraphRenderer(element) {
    const { modifier } = element;
    return (
      <p className={`proyect-content__info-value ${modifier || ''}`}>
        {valuesRenderer(element)}
      </p>
    );
  }

  function elementRenderer(element) {
    const { isInput, isLarge, name } = element;
    if (isMine && isInput && isLarge) {
      return largeInputRenderer(element);
    }
    if (isMine && isInput) {
      return inputRenderer(element);
    }
    if (name === 'discipline' && isMine) {
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
          const { title } = element;
          return (
            <div
              className="proyect-content__info-element"
              key={elements.indexOf(element)}
            >
              <h2 className="proyect-content__info-key">{title}</h2>
              {elementRenderer(element)}
            </div>
          );
        })}
      </div>
      {btnRenderer()}
    </form>
  );
}
