import React from 'react';

export default function Form(props) {
  const { formName, inputs, submitText, onSubmit } = props;
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

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  const inputRender = function () {
    return inputs.map((input) => {
      if (input.name === 'discipline') {
        return (
          <div className="form__input-container" key={inputs.indexOf(input)}>
            <p className="form__input-descrption">{input.title}</p>
            <select
              required
              className="form__input"
              name="discipline"
              key={inputs.indexOf(input)}
              onChange={input.onChange}
              defaultValue="-- select an option --"
              placeholder="-- select an option --"
            >
              <option disabled defaultValue>
                -- select an option --
              </option>
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
              className={
                input.modifier ? `form__input ${input.modifier}` : 'form__input'
              }
              name={input.name}
              placeholder={input.title}
              type={input.type}
              onChange={input.onChange}
            ></textarea>
          </div>
        );
      } else {
        return (
          <div className="form__input-container" key={inputs.indexOf(input)}>
            <p className="form__input-descrption">{input.title}</p>
            <input
              required
              className={
                input.modifier ? `form__input ${input.modifier}` : 'form__input'
              }
              name={input.name}
              placeholder={input.title}
              type={input.type}
              onChange={input.onChange}
            ></input>
          </div>
        );
      }
    });
  };

  return (
    <form className="form">
      <div className="form__overlay" />
      <h1 className="form__title">{formName}</h1>
      {inputRender()}
      <button className="form__submit-btn" onClick={handleSubmit}>
        {submitText}
      </button>
    </form>
  );
}
