import React from 'react';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Presentation(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { elements, submitText, img, onSubmit } = props;
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

  const largeInputRenderer = function (element) {
    return (
      <textarea
        className={`presentation__info-value presentation__input ${
          element.modifier || ''
        }`}
        placeholder={currentUser[element.value]}
        onChange={element.onChange}
      />
    );
  };

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

  const paragraphRenderer = function (element) {
    return (
      <p className={`presentation__info-value ${element.modifier || ''}`}>
        {currentUser[element.value] || 0}
      </p>
    );
  };

  const elementRenderer = function (element) {
    if (isMe && element.isInput && element.isLarge) {
      return largeInputRenderer(element);
    }
    if (isMe && element.isInput) {
      return inputRenderer(element);
    } else {
      return paragraphRenderer(element);
    }
  };

  return (
    <form className="presentation">
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
              <h2 className="presentation__info-key">{element.key}</h2>
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
