import React from 'react';

export default function PopupWithConfirmation(props) {
  const { isOpen, onClose, onDelete } = props;

  function handleClose(e) {
    e.preventDefault();
    onClose();
  }

  function handleDelete(e) {
    e.preventDefault();
    onDelete();
    onClose();
  }
  return (
    <section className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__overlay"></div>
      <div className="popup__body">
        <button className="popup__close-btn" onClick={handleClose} />
        <p className="popup-with-confirmation__msg">
          No hay vuelta atrás, ¿confirmas la eliminación?
        </p>
        <div className="popup-with-confirmation__btn-container">
          <button
            className="popup-with-confirmation__btn"
            onClick={handleDelete}
          >
            Sí
          </button>
          <button
            className="popup-with-confirmation__btn"
            onClick={handleClose}
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
}
