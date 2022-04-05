export default class UserInfo {
  constructor({ data }) {
    this._name = data.name;
    this._about = data.about;
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      about: this._about.textContent
    };
    return userData;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
  }
}
