import avatar from '../images/profile__image.jpg';

/**
 * Main JSX component.
 *
 * @param {*} props
 * @param {Function} props.onEditProfileClick
 * @param {Function} props.onAddPlaceClick
 * @param {Function} props.onEditAvatarClick
 * @returns JSX component
 */

function Main(props) {
  const { onEditProfileClick, onAddPlaceClick, onEditAvatarClick } = props;
  return (
    <main className="main">
      <section className="profile">
        <button className="profile__avatar" type="button" onClick={onEditAvatarClick}>
          <img className="profile__image" src={avatar} alt="profile" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">Please be patient</h1>
          <button className="profile__edit-button" type="button" aria-label="Edit profile" onClick={onEditProfileClick} />
          <p className="profile__bio">We are fetching your user info...</p>
        </div>
        <button className="profile__add-button"  type="button" aria-label="Add an item" onClick={onAddPlaceClick} />
      </section>
      <section className="gallery">
        <ul className="gallery__container">
        </ul>
      </section>
    </main>
  );
}

export default Main;
