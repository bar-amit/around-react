function ImagePopup() {
  return (
    <div className="popup popup_name_picture">
      <div className="popup__picture-container">
        <button className="popup__close-button" type="button" aria-label="close"></button>
        <img className="popup__picture" src="https://cdn.vox-cdn.com/thumbor/9j-s_MPUfWM4bWdZfPqxBxGkvlw=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg" alt="rickroll" />
        <h2 className="popup__picture-title">title</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
