import React from 'react';
import Input from '../Input/Input';

export default function Form(props) {
  const { formName, inputs, submitText, onSubmit, disciplines } = props;
  const [validatedInputs, setValidatedInputs] = React.useState([]);
  const [isValidForm, setValidForm] = React.useState(true);

  const formRef = React.useRef(null);
  let formValidity;

  React.useEffect(() => {
    formValidity = formRef.current.checkValidity();
    if (formValidity) {
      setValidForm(true);
    } else {
      // setValidForm(false);
    }
  }, [setValidForm, formValidity]);

  function handleSubmit(e) {
    // const form = e.currentTarget;
    e.preventDefault();
    // console.log(form.checkValidity());
    // if (form.checkValidity() === false) {
    //   return;
    // }
    // setValidForm(true);
    onSubmit();
    // setValidated(true);
  }

  return (
    <form className="form" onSubmit={handleSubmit} ref={formRef}>
      <div className="form__overlay" />
      <h1 className="form__title">{formName}</h1>
      {inputs.map((input) => {
        return (
          <Input
            inputData={input}
            disciplines={disciplines}
            key={input.name}
            onValidatedInputs={setValidatedInputs}
            validatedInputs={validatedInputs}
          />
        );
      })}
      <button
        type="submit"
        className={`form__submit-btn ${
          isValidForm || 'form__submit-btn_inactive'
        }`}
        disabled={!isValidForm}
      >
        {submitText}
      </button>
    </form>
  );
}
