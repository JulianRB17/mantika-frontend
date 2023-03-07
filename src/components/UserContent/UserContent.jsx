import React from 'react';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function UserContent(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [user, setUser] = React.useState('');

  const {
    elements,
    submitText,
    img,
    onSubmit,
    disciplines,
    openPopupWithConfirmation,
    getUser,
  } = props;
  const { id } = useParams();

  const [isMe, setIsMe] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (currentUser._id === id) {
        setUser(currentUser);
        setIsMe(true);
      } else {
        const selectedUser = await getUser(id);
        setUser(selectedUser);
        setIsMe(false);
      }
    })();
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  const handleDelete = function (e) {
    e.preventDefault();
    openPopupWithConfirmation();
  };

  function colaborationRenderer(element) {
    if (
      element.value === 'createdProyects' ||
      element.value === 'colaboratingInProyects'
    ) {
      return `${user[element.value].length} proyectos`;
    }
    if (user[element.value]) {
      return user[element.value];
    }
    return '-';
  }

  function disciplineRenderer(element) {
    return (
      <select
        required
        className="user-content__input user-content__info-value"
        name="discipline"
        key={elements.indexOf(element)}
        onChange={element.onChange}
        defaultValue={user.discipline}
        placeholder={user.discipline}
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
        className={`user-content__info-value user-content__input ${
          element.modifier || ''
        }`}
        placeholder={user[element.value]}
        onChange={element.onChange}
      />
    );
  }

  const inputRenderer = function (element) {
    return (
      <input
        className={`user-content__info-value user-content__input ${
          element.modifier || ''
        }`}
        placeholder={user[element.value]}
        onChange={element.onChange}
      />
    );
  };

  function paragraphRenderer(element) {
    return (
      <p className={`user-content__info-value ${element.modifier || ''}`}>
        {colaborationRenderer(element)}
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
    if (element.name === 'discipline' && isMe) {
      return disciplineRenderer(element);
    } else {
      return paragraphRenderer(element);
    }
  }

  if (user)
    return (
      <form className="user-content">
        <button className="user-content__trash-btn" onClick={handleDelete} />
        <img
          src={img}
          alt="Imagen de perfil"
          className="user-content__profile-img"
        />
        <div className="user-content__info-container">
          {elements.map((element) => {
            return (
              <div
                className="user-content__info-element"
                key={elements.indexOf(element)}
              >
                <h2 className="user-content__info-key">{element.title}</h2>
                {elementRenderer(element)}
              </div>
            );
          })}
        </div>

        <button className="user-content__submit-btn" onClick={handleSubmit}>
          {submitText}
        </button>
      </form>
    );
}
