import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ title, name: formName, buttonText, isOpen, onClose, onSubmit }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChange(e){
    if(e.target.name==='title')
      setName(e.target.value);
    else
      setLink(e.target.value);
  }

  function newPlaceSubmit(){
    return onSubmit({name, link});
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm title={title} name={formName} buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={newPlaceSubmit} >
        <label className="form__field">
          <input id="input_title" className="form__input form__input_type_title" value={name} type="text" name="title" placeholder="Title" minLength="1" maxLength="30" required onChange={handleChange} />
          <span id="input_title-error" className="form__input-error"></span>
        </label>
        <label className="form__field">
          <input id="input_link" className="form__input form__input_type_link" value={link} type="url" name="link" placeholder="Image link" required onChange={handleChange} />
          <span id="input_link-error" className="form__input-error"></span>
        </label>
      </PopupWithForm>
  );
}

export default AddPlacePopup;
