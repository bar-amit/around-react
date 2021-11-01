import { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ title, name: formName, buttonText, isOpen, onClose, onSubmit }){
  const [link, setLink] = useState('');

  const inputRef = useRef();

  function onInputChange(e){
    setLink(inputRef.current.value);
  }

  function editAvatarSubmit(){
    return onSubmit(link);
  }

  useEffect(()=>{

  },[isOpen]);

  return (
    <PopupWithForm title={title} name={formName} buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={editAvatarSubmit} >
      <label className="form__field">
        <input id="input_url" className="form__input form__input_type_url" ref={inputRef} type="url" name="url" placeholder="Image URL" required onChange={onInputChange} />
        <span id="input_url-error" className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
