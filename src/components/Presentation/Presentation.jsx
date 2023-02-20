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
        {/* <input
          className="presentation__username presentation__input"
          placeholder={username}
        />
        <div className="presentation__info-container">
          <div className="presentation__info-element">
            <h2 className="presentation__info-key">Disciplina:</h2>
            <input
              className="presentation__info-value presentation__input"
              placeholder={discipline}
            />
          </div>
          <div className="presentation__info-element">
            <h2 className="presentation__info-key">Ciudad:</h2>
            <input
              className="presentation__info-value presentation__input"
              placeholder={place}
            />
          </div>
          <div className="presentation__info-element">
            <h2 className="presentation__info-key">About:</h2>
            <textarea
              className="presentation__info-value presentation__input"
              placeholder={about}
            />
          </div>
          <div className="presentation__info-element">
            <h2 className="presentation__info-key">Proyectos creados:</h2>
            <p className="presentation__info-value">{proyectsCreated}</p>
          </div>
          <div className="presentation__info-element">
            <h2 className="presentation__info-key">Colaborando en:</h2>
            <p className="presentation__info-value">{colaboratingProyects}</p>
          </div>
        </div> */}
        <button className="presentation__submit-btn">{submitText}</button>
      </form>
    );
  }
  // else
  //     return (
  //       <section className="presentation">
  //         <img
  //           src={profileImg}
  //           alt="Imagen de perfil"
  //           className="presentation__profile-img"
  //         />
  //         <h1 className="presentation__username">{username}</h1>
  //         <div className="presentation__info-container">
  //           <div className="presentation__info-element">
  //             <h2 className="presentation__info-key">Disciplina:</h2>
  //             <p className="presentation__info-value">{discipline}</p>
  //           </div>
  //           <div className="presentation__info-element">
  //             <h2 className="presentation__info-key">Ciudad:</h2>
  //             <p className="presentation__info-value">{place}</p>
  //           </div>
  //           <div className="presentation__info-element">
  //             <h2 className="presentation__info-key">About:</h2>
  //             <p className="presentation__info-value">{about}</p>
  //           </div>
  //           <div className="presentation__info-element">
  //             <h2 className="presentation__info-key">Proyectos creados:</h2>
  //             <p className="presentation__info-value">{proyectsCreated}</p>
  //           </div>
  //           <div className="presentation__info-element">
  //             <h2 className="presentation__info-key">Colaborando en:</h2>
  //             <p className="presentation__info-value">{colaboratingProyects}</p>
  //           </div>
  //         </div>
  //       </section>
  //     );
}
