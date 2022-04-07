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
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getCards() {
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

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
    }).catch(res => {
      console.log(res.status)
    })
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
    }).catch(res => {
      console.log(res.status)
    })
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(res => {
      if(res.ok) {
        return res.json();
      }
    }).catch(res => {
      console.log(res.status)
    })
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
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
