export default class Api {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
    }).catch(res => {
      console.log(res.status)
    })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
    }).catch(res => {
      console.log(res.status)
    })
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
    }).catch(res => {
      console.log(res.status)
    })
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      })
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
    }).catch(res => {
      console.log(res.status)
    })
  }


}
