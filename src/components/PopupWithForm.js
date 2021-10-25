import React from "react";

/**
 * Popup with form component.
 * @param {{title: string, name: string, isOpen: boolean, onClose: Function}} props - Props object.
 * @returns {JSX.Element} Popup With Form JSX component.
 */
function PopupWithForm(props) {
  const { title, name, isOpen, onClose } = props;

  const handleOverlayClose = (e) => {
    if(e.target.classList.contains('popup_visible'))
      onClose();
  };

  return (
    <div className={`popup popup_name_${name} ${isOpen ? 'popup_visible' : ''}`} onClick={handleOverlayClose}>
      <div className="popup__container">
        <button className="popup__close-button popup__close-button_shrink" type="button" aria-label="close" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className={`form form_name_${name}`} name={name} noValidate>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
