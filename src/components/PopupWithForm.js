/**
 * Popup JSX component with a form.
 *
 * @param {*} props - The props object.
 * @property {string} props.title - The title of the popup.
 * @property {string} props.name - The name to be used for the class name and 'name' attribute.
 * @property {Boolean} props.isOpen - Popup's visibility state.
 * @property {Function} props.onClose - Close popup.
 * @constructor
*/

import React from "react";

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
