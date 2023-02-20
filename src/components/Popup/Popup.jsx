import React from 'react';

export default function Popup(props) {
  const { popupName, isPopupOpen } = props;
  const popupTitle = 'Login';
  const submitText = 'Save';

  return (
    <section className={isPopupOpen ? 'popup popup_opened' : 'popup'}>
      <div className="popup__overlay"></div>
      <div className={'popup__body'}>
        <button className="popup__close-btn"></button>
        <h1 className="popup__title">{popupTitle}</h1>
        <button className="popup__submit-btn">{submitText}</button>
      </div>
    </section>
  );
}
