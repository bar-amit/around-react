import React, { useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';
import avatar from '../images/profile__image.jpg';

/**
 * Main JSX component.
 *
 * @param {*} props
 * @param {Function} props.onEditProfileClick
 * @param {Function} props.onAddPlaceClick
 * @param {Function} props.onEditAvatarClick
 * @param {Function} props.onCardClick
 * @returns JSX component
 */

function Main(props) {
  const { onEditProfileClick, onAddPlaceClick, onEditAvatarClick, onCardClick } = props;

  const [ userName, setUserName ] = React.useState(undefined);
  const [ userDecription, setUserDescription ] = React.useState(undefined);
  const [ userAvatar, setUserAvatar ] = React.useState(undefined);

  const [ cardList, setCardList ] = React.useState([]);

  useEffect(() => {
    api.getUserInfo()
    .then(data => {
      setUserName(data.name);
      setUserDescription(data.about);
      setUserAvatar(data.avatar);
    })
    .then(() =>
      api.getCards()
      .then(data=>setCardList(data))
      .catch(e=>console.log(e))
    )
    .catch(e=>console.log(e));
  },[]);

  return (
    <main className="main">
      <section className="profile">
        <button className="profile__avatar" type="button" onClick={onEditAvatarClick}>
          <img className="profile__image" src={userAvatar ? userAvatar : avatar } alt="profile" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{userName ? userName : 'Please be patient'}</h1>
          <button className="profile__edit-button" type="button" aria-label="Edit profile" onClick={onEditProfileClick} />
          <p className="profile__bio">{userDecription ? userDecription : 'We are fetching your user info...'}</p>
        </div>
        <button className="profile__add-button"  type="button" aria-label="Add an item" onClick={onAddPlaceClick} />
      </section>
      <section className="gallery">
        <ul className="gallery__container">
          {cardList.map(card => (<Card data={card} onCardClick={onCardClick} key={card._id} />))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
