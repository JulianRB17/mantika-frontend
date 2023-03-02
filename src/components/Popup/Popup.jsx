import React from 'react';
import popupSuccessIcon from '../../images/crear.png';
import popupErrorIcon from '../../images/sad-filled.png';

export default function Popup(props) {
  const { isPopupOpen, popupError, onClose } = props;

  function handleClose(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <section className={`popup ${isPopupOpen && 'popup_opened'}`}>
      <div className="popup__overlay"></div>
      <div className="popup__body">
        <button className="popup__close-btn" onClick={handleClose} />
        <img
          src={popupError ? popupErrorIcon : popupSuccessIcon}
          className="popup__icon"
          alt="popup icon"
        />
        <p className="popup__msg">
          {popupError ? 'Ups, algo salió mal' : '¡A seguir creando!'}
        </p>
      </div>
    </section>
  );
}
