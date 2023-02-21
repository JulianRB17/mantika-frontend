import React from 'react';

export default function Presentation(props) {
  const { elements, submitText, img } = props;
  const [isMe, setIsMe] = React.useState(true);

  if (isMe) {
    return (
      <form className="presentation">
        <img
          src={img}
          alt="Imagen de perfil"
          className="presentation__profile-img"
        />
        <div className="presentation__info-container">
          {elements.map((element) => {
            const elementRenderer = function () {
              if (element.isInput && element.isLarge) {
                return (
                  <textarea
                    className={`presentation__info-value presentation__input ${
                      element.modifier ? element.modifier : ''
                    }`}
                    placeholder={element.value}
                  />
                );
              }

              if (element.isInput) {
                return (
                  <input
                    className={`presentation__info-value presentation__input ${
                      element.modifier ? element.modifier : ''
                    }`}
                    placeholder={element.value}
                  />
                );
              } else {
                return (
                  <p
                    className={`presentation__info-value ${
                      element.modifier ? element.modifier : ''
                    }`}
                  >
                    {element.value}
                  </p>
                );
              }
            };

            return (
              <div
                className="presentation__info-element"
                key={elements.indexOf(element)}
              >
                <h2 className="presentation__info-key">{element.key}</h2>
                {elementRenderer()}
              </div>
            );
          })}
        </div>

        <button className="presentation__submit-btn">{submitText}</button>
      </form>
    );
  }
}
