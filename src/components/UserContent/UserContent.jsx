import React from 'react';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import api from '../../utils/api';
import defaultImg from '../../images/default.jpg';

export default function UserContent(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [user, setUser] = React.useState('');
  const [isMe, setIsMe] = React.useState(false);

  const {
    elements,
    submitText,
    onSubmit,
    disciplines,
    openPopupWithConfirmation,
  } = props;
  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      if (currentUser._id === id) {
        setUser(currentUser);
        setIsMe(true);
      } else {
        const selectedUser = await api.getUser(id);
        setUser(selectedUser);
        setIsMe(false);
      }
    })();
  }, [currentUser, id]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  const handleDelete = function (e) {
    e.preventDefault();
    openPopupWithConfirmation();
  };

  function valuesRenderer(element) {
    const { name } = element;
    if (name === 'createdProyects' || name === 'colaboratingInProyects') {
      return `${user[name].length} proyectos`;
    }
    if (user[name]) {
      return user[name];
    }
    return '-';
  }

  function disciplineRenderer(element) {
    const { onChange } = element;
    return (
      <select
        required
        className="user-content__input user-content__info-value"
        name="discipline"
        key={elements.indexOf(element)}
        onChange={onChange}
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
    const { name, modifier, onChange } = element;
    return (
      <textarea
        className={`user-content__info-value user-content__input ${
          modifier || ''
        }`}
        placeholder={user[name]}
        onChange={onChange}
        name={name}
      />
    );
  }

  const inputRenderer = function (element) {
    const { name, modifier, onChange } = element;
    return (
      <input
        className={`user-content__info-value user-content__input ${
          modifier || ''
        }`}
        placeholder={user[name]}
        onChange={onChange}
        name={name}
      />
    );
  };

  function paragraphRenderer(element) {
    const { modifier } = element;
    return (
      <p className={`user-content__info-value ${modifier || ''}`}>
        {valuesRenderer(element)}
      </p>
    );
  }

  function elementRenderer(element) {
    const { isInput, isLarge, name } = element;
    if (isMe && isInput && isLarge) {
      return largeInputRenderer(element);
    }
    if (isMe && isInput) {
      return inputRenderer(element);
    }
    if (name === 'discipline' && isMe) {
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
          src={user.profilePic || defaultImg}
          alt="Imagen de perfil"
          className="user-content__profile-img"
        />
        <div className="user-content__info-container">
          {elements.map((element) => {
            const { title } = element;
            return (
              <div
                className="user-content__info-element"
                key={elements.indexOf(element)}
              >
                <h2 className="user-content__info-key">{title}</h2>
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
