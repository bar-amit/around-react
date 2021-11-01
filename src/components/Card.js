import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

/**
 * Card JSX component
 * @param {{data: cardData, onCardClick: Function}} param0 - props object
 * @returns
 * cardData type defenition:
 * @typedef {Object} cardData
 * @property {string} _id - Card ID.
 * @property {string} createdAt - Time of creation.
 * @property {Array<string>} likes - An array of IDs of users whom liked the card.
 * @property {string} link - Link to card image.
 * @property {string} name - Card title.
 * @property {userData} owner - User data of card's owner.
 */

function Card({data, onCardClick}) {
  const {_id: id} = useContext(CurrentUserContext);

  const isOwn = id===data.owner._id;
  const isLiked = data.likes.some(like=>like._id===id);
  return (
    <li className="card">
        {isOwn ? <button className="card__delete-button" type="button" aria-label="delete"></button> : ''}
        <img className="card__image" src={data.link} alt={data.name} onClick={() => onCardClick(data)} />
        <div className="card__panel">
          <h2 className="card__title">{data.name}</h2>
          <div className="card__like">
            <button className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`} type="button" aria-label="Like"></button>
            <p className="card__like-counter">{data.likes.length}</p>
          </div>
        </div>
      </li>
  );
}

export default Card;
