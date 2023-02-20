import React from 'react';

export default function Form(props) {
  const { formName, inputs, submitText, title } = props;
  const disciplines = [
    'theater',
    'contemporary dance',
    'traditional dance',
    'ballet',
    'painting',
    'sculpture',
    'engraving',
    'ceramic',
    'graphic design',
    'drawing',
    'filmaking',
    'photography',
    'literature',
    'poetry',
    'dramatic literature',
    'music',
    'performance art',
    'interdisciplinary and multidisciplinary arts',
    'architecture',
    'ilustration',
    'installation and conceptual art',
  ];

  const inputRender = function () {
    return inputs.map((input) => {
      if (input.name === 'Discipline') {
        return (
          <div className="form__input-container" key={inputs.indexOf(input)}>
            <p className="form__input-descrption">Discipline</p>
            <select
              required
              className="form__input"
              name="discipline"
              key={inputs.indexOf(input)}
              //   defaultValue="-- select an option --"
              //   value="-- select an option --"
              //   placeholder="-- select an option --"
            >
              {/* <option disabled selected value>
                -- select an option --
              </option> */}
              {disciplines.map((discipline) => {
                return (
                  <option
                    value={discipline}
                    key={disciplines.indexOf(discipline)}
                  >
                    {discipline}
                  </option>
                );
              })}
            </select>
          </div>
        );
      }
      if (input.modifier) {
        return (
          <div className="form__input-container" key={inputs.indexOf(input)}>
            <p className="form__input-descrption">{input.title}</p>
            <textarea
              required
              className={`form__input ${input.modifier}`}
              name={input.name}
              placeholder={input.title}
              type={input.type}
            ></textarea>
          </div>
        );
      } else
        return (
          <div className="form__input-container" key={inputs.indexOf(input)}>
            <p className="form__input-descrption">{input.title}</p>
            <input
              required
              className="form__input"
              name={input.name}
              placeholder={input.title}
              type={input.type}
            ></input>
          </div>
        );
    });
  };

  return (
    <form className="form">
      <div className="form__overlay" />
      <h1 className="form__title">{formName}</h1>
      {inputRender()}
      <button className="form__submit-btn">{submitText}</button>
    </form>
  );
}
