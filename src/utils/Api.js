/**
 * Api utility for Around the USA app.
 */
class Api {
  /**
   * Constructor function for the Api class.
   * @param {{host: string, authorization: string}}} param0 - Options object with a base url and a token for the server.
   */
  constructor({host, authorization}) {
    this._host = host;
    this._headers = { authorization }
    this.userId = undefined;
  }
  /**
   * A private method for handling a respones from server.
   * @param {*} res
   * @returns {Promise<*>}
   */
  _handleResponse(res){
    if(res.ok)
      return res.json();
    return Promise.reject(`error: ${res.status}, ${res.statusText}`);
  }
  /**
   * Fetching user data from the server
   * @param {string} id - Optional (default is own user)
   * @returns {Promise<{name: string, about: string, avatar: string, cohort: string, _id: string}>} - User data {name, about, avatar, cohort, _id}
   */
  getUserInfo(id='me'){
    return fetch(`${this._host}/users/${id}`,{headers: this._headers})
    .then(this._handleResponse)
    .then(data => {
      this.userId = data._id;
      return data;
    });
  }
  /**
   * Setting a new avatar with a PATCH request to server.
   * @param {string} avatar - Image link.
   * @returns {Promise<{name: string, about: string, avatar: string, cohort: string, _id: string}>} - User data {name, about, avatar, cohort, _id}
   */
  updateUserAvatar(avatar){
    return fetch(`${this._host}/users/me/avatar`,{
      method: 'PATCH',
      headers: {
        ...this._headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar
      })})
    .then(this._handleResponse);
  }
  /**
   * Fetching a list of cards from the server.
   * @returns {Promise<Array<{_id: string, createdAt: string, likes: Array<string>, link: string, name: string, owner: {name: string, about: string, avatar: string, cohort: string, _id: string}}>>} - A promise for an array of card data.
   */
  getCards(){
    return fetch(`${this._host}/cards`,{headers: this._headers})
    .then(this._handleResponse);
  }
  /**
   * Setting new user name and description.
   * @param {{name: string, about: string}} param0 - An object with username and description.
   * @returns {Promise<{name: string, about: string, avatar: string, cohort: string, _id: string}>} - User data {name, about, avatar, cohort, _id}
   */
  updateUser({name,about}){
    return fetch(`${this._host}/users/me`,{
      method: 'PATCH',
      headers: {
        ...this._headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        about
      })})
    .then(this._handleResponse);
  }
  /**
   * Adding a new card to the server.
   * @param {{name: string, link: string}} param0
   * @returns {Promise<{_id: string, createdAt: string, likes: Array<string>, link: string, name: string, owner: {name: string, about: string, avatar: string, cohort: string, _id: string}}>} - Card data.
   */
  addCard({name,link}){
    return fetch(`${this._host}/cards`,{
      method: 'POST',
      headers: {
        ...this._headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        link
      })})
    .then(this._handleResponse);
  }
  /**
   * Delete a card form the server.
   * @param {string} id - Card id.
   * @returns {Promise<undefined>}
   */
  deleteCard(id){
    return fetch(`${this._host}/cards/${id}`, {method: 'DELETE', headers: this._headers})
    .then(this._handleResponse);
  }
  /**
   * Add like to a card
   * @param {string} id - card id
   * @returns {Promise<{_id: string, createdAt: string, likes: Array<string>, link: string, name: string, owner: {name: string, about: string, avatar: string, cohort: string, _id: string}}>} - Card data.
   */
  addLike(id){
    return fetch(`${this._host}/cards/likes/${id}`, {method: 'PUT', headers: this._headers})
    .then(this._handleResponse);
  }
  /**
   * Remove like from a card
   * @param {string} id - card id
   * @returns {Promise<{_id: string, createdAt: string, likes: Array<string>, link: string, name: string, owner: {name: string, about: string, avatar: string, cohort: string, _id: string}}>} - Card data.
   */
  removeLike(id){
    return fetch(`${this._host}/cards/likes/${id}`, {method: 'DELETE', headers: this._headers})
    .then(this._handleResponse);
  }
}

const api = new Api({host: 'https://around.nomoreparties.co/v1/group-12', authorization:'9dcb4203-ec5d-4132-a4af-e260b13cb4d2'});

export default api;
