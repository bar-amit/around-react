import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const onEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const onAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const onEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  };

  return (
    <>
    <Header />
    <Main onEditProfileClick={onEditProfileClick} onAddPlaceClick={onAddPlaceClick} onEditAvatarClick={onEditAvatarClick} />
    <Footer />

    <PopupWithForm title="Edit profile" name="edit-profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
      <label className="form__field">
        <input id="input_name" className="form__input form__input_type_name" type="text" name="name" placeholder="Name" minLength="2" maxLength="40" required />
        <span id="input_name-error" className="form__input-error"></span>
      </label>
      <label className="form__field">
        <input id="input_bio" className="form__input form__input_type_bio" type="text" name="bio" placeholder="About me" minLength="2" maxLength="200" required />
        <span id="input_bio-error" className="form__input-error"></span>
      </label>
      <button className="form__save-button form__save-button_disabled" type="submit">Save</button>
    </PopupWithForm>

    <PopupWithForm title="New Place" name="new-place" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
      <label className="form__field">
        <input id="input_title" className="form__input form__input_type_title" type="text" name="title" placeholder="Title" minLength="1" maxLength="30" required />
        <span id="input_title-error" className="form__input-error"></span>
      </label>
      <label className="form__field">
        <input id="input_link" className="form__input form__input_type_link" type="url" name="link" placeholder="Image link" required />
        <span id="input_link-error" className="form__input-error"></span>
      </label>
      <button className="form__save-button form__save-button_disabled" type="submit">Create</button>
    </PopupWithForm>

    <PopupWithForm title="Change profile picture" name="edit-avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
      <label className="form__field">
        <input id="input_url" className="form__input form__input_type_url" type="url" name="url" placeholder="Image URL" required />
        <span id="input_url-error" className="form__input-error"></span>
      </label>
      <button className="form__save-button form__save-button_disabled" type="submit">Save</button>
    </PopupWithForm>

    <PopupWithForm title="Are you sure?" name="confirm" onClose={closeAllPopups}>
      <button className="popup__button" type="button">Yes</button>
    </PopupWithForm>

    <ImagePopup />

    <template className="card__template">
      <li className="card">
        <button className="card__delete-button" type="button" aria-label="delete"></button>
        <img className="card__image" src="https://cdn.vox-cdn.com/thumbor/9j-s_MPUfWM4bWdZfPqxBxGkvlw=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg" alt="rickroll" />
        <div className="card__panel">
          <h2 className="card__title">title</h2>
          <div className="card__like">
            <button className="card__like-button" type="button" aria-label="Like"></button>
            <p className="card__like-counter">0</p>
          </div>
        </div>
      </li>
    </template>

    </>
  );
}

export default App;
