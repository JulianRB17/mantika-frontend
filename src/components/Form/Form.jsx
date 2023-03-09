import React from 'react';

export default function Form(props) {
  const { formName, inputs, submitText, onSubmit, disciplines } = props;
  const [isValidForm, setValidInput] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  function errorMessageRenderer(input) {
    return <span className="form__error-msg">{input.errorMessage}</span>;
  }

  function disciplineRenderer(input) {
    return (
      <div className="form__input-container" key={inputs.indexOf(input)}>
        <label className="form__input-descrption">{input.title}</label>
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
              <option value={discipline} key={disciplines.indexOf(discipline)}>
                {discipline}
              </option>
            );
          })}
        </select>
        {errorMessageRenderer(input)}
      </div>
    );
  }

  function inputLargeRenderer(input) {
    return (
      <div className="form__input-container" key={inputs.indexOf(input)}>
        <label className="form__input-descrption">{input.title}</label>
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
        {errorMessageRenderer(input)}
      </div>
    );
  }

  function inputRenderer(input) {
    return (
      <div className="form__input-container" key={inputs.indexOf(input)}>
        <label className="form__input-descrption">{input.title}</label>
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
        {errorMessageRenderer(input)}
      </div>
    );
  }

  function inputsRenderer() {
    return inputs.map((input) => {
      if (input.name === 'discipline') {
        return disciplineRenderer(input);
      }
      if (input.modifier) {
        return inputLargeRenderer(input);
      } else {
        return inputRenderer(input);
      }
    });
  }

  return (
    <form className="form">
      <div className="form__overlay" />
      <h1 className="form__title">{formName}</h1>
      {inputsRenderer()}
      <button
        className={`form__submit-btn ${
          isValidForm || 'form__submit-btn_inactive'
        }`}
        disabled={!isValidForm}
        onClick={handleSubmit}
      >
        {submitText}
      </button>
    </form>
  );
}
