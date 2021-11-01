import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";

import api from '../utils/api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = React.useState({name: '', about: ''});
  const [cards, setCards] = React.useState([]);

  /*
    Popups state
  */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [confirmPopupState, setConfirmPopupState] = React.useState({isOpen: false, cardId: ''});

  const [selectedCard, setSelectedCard] = React.useState({});

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  React.useEffect(() => {
    const handleEscapeClose = (e) => {
      if(e.key==='Escape')
        closeAllPopups();
    }

    document.addEventListener('keydown', handleEscapeClose);

    return () => document.removeEventListener('keydown', handleEscapeClose);
    }, []);

  /*
    Page's buttons click handlers
  */
  const onEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const onAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const onEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  /*
    Form data functions
  */
 /**
  * Update profile info
  * @param {{name: string, about: string}} param0
  * @returns Promise
  */
  function onProfileSubmit({name,about}){
    return api.updateUser({name,about})
    .then(updateUserInfo)
    .then(() => setIsEditProfilePopupOpen(false))
    .catch(e=>console.log(e));
  }
/**
 * Add a new card
 * @param {{name: string, link: string}} param0
 * @returns Promise
 */
  function onPlaceSubmit({name, link}){
    return api.addCard({name, link})
    .then(updateCards)
    .then(() => setIsAddPlacePopupOpen(false))
    .catch(e=>console.log(e));
  }
/**
 * Set a new avatar
 * @param {string} link
 * @returns Promise
 */
  function onAvatarSubmit(link){
    return api.updateUserAvatar(link)
    .then(updateUserInfo)
    .then(() => setIsEditAvatarPopupOpen(false))
    .catch(e=>console.log(e));
  }
/**
 * Confirmation dialog to delete a card
 * @returns Promise
 */
  function onConfirmSubmit(){
    return api.deleteCard(confirmPopupState.cardId)
    .then(updateCards)
    .then(() => setConfirmPopupState({isOpen: false, cardId: ''}))
    .catch(e=>console.log(e));
  }

  /*
    Card functions
  */
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
    setConfirmPopupState({isOpen: true, cardId: card._id});
  }

  /*
    Api calls
  */
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

  return (
    <>
    <Header />

    <CurrentUserContext.Provider value={currentUser}>
      <Main onEditProfileClick={onEditProfileClick} onAddPlaceClick={onAddPlaceClick} onEditAvatarClick={onEditAvatarClick} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} cardsList={cards} />

      <EditProfilePopup title="Edit profile" name="edit-profile" buttonText='Save' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onSubmit={onProfileSubmit} />

      <AddPlacePopup title="New Place" name="new-place" buttonText='Create' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={onPlaceSubmit} />

      <EditAvatarPopup title="Change profile picture" name="edit-avatar" buttonText='Save' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onSubmit={onAvatarSubmit} />

      <PopupWithForm title="Are you sure?" name="confirm" buttonText='Yes' isOpen={confirmPopupState.isOpen} onClose={closeAllPopups} onSubmit={onConfirmSubmit} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>

    <Footer />
    </>
  );
}

export default App;
