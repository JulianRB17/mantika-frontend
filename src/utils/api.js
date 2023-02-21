class Api {
  constructor(
    options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
      },
    }
  ) {
    this._baseUrl = '';
    this._options = options;
  }

  _fetchData() {
    if (this._jwt) this._options.headers.authorization = `Bearer ${this._jwt}`;
    return fetch(this._baseUrl + this._specificUrl, this._options)
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  getUserInfo(jwt) {
    this._jwt = jwt;
    this._specificUrl = 'users/me';
    this._options.method = 'GET';
    delete this._options.body;
    return this._fetchData();
  }

  deleteUser(id) {
    this._specificUrl = `users/${id} `;
    this._options.method = 'DELETE';
    delete this._options.body;
    return this._fetchData().then(() => id);
  }

  deleteProyect(id) {
    this._specificUrl = `proyects/${id} `;
    this._options.method = 'DELETE';
    delete this._options.body;
    return this._fetchData().then(() => id);
  }

  createProyect(data) {
    this._specificUrl = 'proyects';
    this._options.method = 'POST';
    this._options.body = JSON.stringify({
      proyectName: data.proyectName,
      description: data.description,
      discipline: data.discipline,
    });
    return this._fetchData();
  }

  changeUserInfo(data) {
    this._specificUrl = 'users/me';
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify({
      username: data.username,
      discipline: data.discipline,
      city: data.city,
      about: data.about,
    });
    return this._fetchData();
  }

  getInitialProyects() {
    this._specificUrl = 'proyects';
    this._options.method = 'GET';
    delete this._options._body;
    return this._fetchData();
  }
}

export default new Api();
