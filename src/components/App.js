import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from "./ImagePopup";

import api from '../utils/MockApi';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({name: '', about: ''});
  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const onEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const onAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const onEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  function onProfileSubmit({name,about}){
    return api.updateUser({name,about})
    .then(updateUserInfo)
    .then(() => setIsEditProfilePopupOpen(false))
    .catch(e=>console.log(e));
  }

  // card functions:
  const onCardClick = (card) => setSelectedCard(card);
  const onCardLike = (card) => {
      if(card.likes.some(like=>like._id===currentUser._id)) return api.removeLike(card._id)
      .then(updateCards)
      .catch(e=>console.log(e));
      return api.addLike(card._id)
      .then(updateCards)
      .catch(e=>console.log(e));
  }
  const onCardDelete = (card) => {
    return api.deleteCard(card._id)
    .then(updateCards)
    .catch(e=>console.log(e));
  }


  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  function updateCards(){
    return api.getCards()
    .then(data=> setCards(data))
    .catch(e=>console.log(e));
  }

  function updateUserInfo(){
    return api.getUserInfo()
    .then(data => setCurrentUser(data))
    .catch(e=>console.log(e));
  }

  React.useEffect(() => {
    updateUserInfo()
    .then(updateCards)
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
      <Main onEditProfileClick={onEditProfileClick} onAddPlaceClick={onAddPlaceClick} onEditAvatarClick={onEditAvatarClick} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} cardsList={cards} />

      <EditProfilePopup title="Edit profile" name="edit-profile" buttonText='Save' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onSubmit={onProfileSubmit} />

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
