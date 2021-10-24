function ImagePopup(props) {
  const {card, onClose} = props;

  return (
    <div className={`popup popup_name_picture ${card.link ? 'popup_visible' : ''}`} onClick={onClose}>
      <div className="popup__picture-container">
        <button className="popup__close-button" type="button" aria-label="close" onClick={onClose} />
        <img className="popup__picture" src={card.link} alt={card.name} />
        <h2 className="popup__picture-title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
