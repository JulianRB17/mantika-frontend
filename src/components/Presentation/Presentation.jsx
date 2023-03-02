import React from 'react';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Presentation(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    elements,
    submitText,
    img,
    onSubmit,
    name,
    setPresentationName,
    disciplines,
    openPopupWithConfirmation,
  } = props;
  const { id } = useParams();
  const [isMe, setIsMe] = React.useState(false);

  React.useEffect(() => {
    if (currentUser._id === id) {
      setIsMe(true);
    } else {
      setIsMe(false);
    }
  }, [currentUser, id]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  const handleDelete = function (e) {
    e.preventDefault();
    setPresentationName(name);
    openPopupWithConfirmation();
  };

  function disciplineRenderer(element) {
    return (
      <select
        required
        className="presentation__input presentation__info-value"
        name="discipline"
        key={elements.indexOf(element)}
        onChange={element.onChange}
        defaultValue={currentUser.discipline}
        placeholder={currentUser.discipline}
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
        className={`presentation__info-value presentation__input ${
          element.modifier || ''
        }`}
        placeholder={currentUser[element.value]}
        onChange={element.onChange}
      />
    );
  }

  const inputRenderer = function (element) {
    return (
      <input
        className={`presentation__info-value presentation__input ${
          element.modifier || ''
        }`}
        placeholder={currentUser[element.value]}
        onChange={element.onChange}
      />
    );
  };

  function paragraphRenderer(element) {
    return (
      <p className={`presentation__info-value ${element.modifier || ''}`}>
        {currentUser[element.value] || 0}
      </p>
    );
  }

  function elementRenderer(element) {
    if (isMe && element.isInput && element.isLarge) {
      return largeInputRenderer(element);
    }
    if (isMe && element.isInput) {
      return inputRenderer(element);
    }
    if (element.name === 'discipline') {
      return disciplineRenderer(element);
    } else {
      return paragraphRenderer(element);
    }
  }

  return (
    <form className="presentation">
      <button className="presentation__trash-btn" onClick={handleDelete} />
      <img
        src={img}
        alt="Imagen de perfil"
        className="presentation__profile-img"
      />
      <div className="presentation__info-container">
        {elements.map((element) => {
          return (
            <div
              className="presentation__info-element"
              key={elements.indexOf(element)}
            >
              <h2 className="presentation__info-key">{element.title}</h2>
              {elementRenderer(element)}
            </div>
          );
        })}
      </div>

      <button className="presentation__submit-btn" onClick={handleSubmit}>
        {submitText}
      </button>
    </form>
  );
}
