function Card({data}) {
  return (
    <li className="card">
        {/* <button className="card__delete-button" type="button" aria-label="delete"></button> */}
        <img className="card__image" src={data.link} alt={data.name} />
        <div className="card__panel">
          <h2 className="card__title">{data.name}</h2>
          <div className="card__like">
            <button className="card__like-button" type="button" aria-label="Like"></button>
            <p className="card__like-counter">{data.likes.length}</p>
          </div>
        </div>
      </li>
  );
}

export default Card;
