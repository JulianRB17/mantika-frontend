class Api {
  constructor() {
    this._baseUrl = 'http://127.0.0.1:3001/';
    this._options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
      },
    };
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

  async deleteUser(id) {
    this._specificUrl = `users/${id} `;
    this._options.method = 'DELETE';
    delete this._options.body;
    const deltedUser = await this._fetchData();
    return deltedUser;
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
    console.log(this);
    const { username, city, description, discipline, password, profilePic } =
      data;
    this._specificUrl = 'users/me';
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify({
      username,
      city,
      description,
      discipline,
      password,
      profilePic,
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
