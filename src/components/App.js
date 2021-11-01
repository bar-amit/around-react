import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import api from '../utils/MockApi';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const onEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const onAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const onEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const onCardClick = (card) => setSelectedCard(card);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  React.useEffect(() => {
    api.getUserInfo()
    .then(data => setCurrentUser(data))
    .then(() =>
      api.getCards()
      .then(data=> setCards(data))
      .catch(e=>console.log(e))
    )
    .catch(e=>console.log(e));
  },[]);

  React.useEffect(() => {
    const handleEscapeClose = (e) => {
      if(e.key==='Escape')
        closeAllPopups();
    }

    document.addEventListener('keydown', handleEscapeClose);

    return () => document.removeEventListener('keydown', handleEscapeClose);
    }, []);

  return (
    <>
    <Header />

    <CurrentUserContext.Provider value={currentUser}>
      <Main onEditProfileClick={onEditProfileClick} onAddPlaceClick={onAddPlaceClick} onEditAvatarClick={onEditAvatarClick} onCardClick={onCardClick} cardsList={cards} />

      <PopupWithForm title="Edit profile" name="edit-profile" buttonText='Save' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <label className="form__field">
          <input id="input_name" className="form__input form__input_type_name" type="text" name="name" placeholder="Name" minLength="2" maxLength="40" required />
          <span id="input_name-error" className="form__input-error"></span>
        </label>
        <label className="form__field">
          <input id="input_bio" className="form__input form__input_type_bio" type="text" name="bio" placeholder="About me" minLength="2" maxLength="200" required />
          <span id="input_bio-error" className="form__input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm title="New Place" name="new-place" buttonText='Create' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <label className="form__field">
          <input id="input_title" className="form__input form__input_type_title" type="text" name="title" placeholder="Title" minLength="1" maxLength="30" required />
          <span id="input_title-error" className="form__input-error"></span>
        </label>
        <label className="form__field">
          <input id="input_link" className="form__input form__input_type_link" type="url" name="link" placeholder="Image link" required />
          <span id="input_link-error" className="form__input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm title="Change profile picture" name="edit-avatar" buttonText='Save' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <label className="form__field">
          <input id="input_url" className="form__input form__input_type_url" type="url" name="url" placeholder="Image URL" required />
          <span id="input_url-error" className="form__input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm title="Are you sure?" name="confirm" buttonText='Yes' onClose={closeAllPopups}>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>

    <Footer />
    </>
  );
}

export default App;
