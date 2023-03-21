const baseUrl = 'http://34.83.49.232:3001/';

const register = async function ({ username, email, password, discipline }) {
  try {
    const res = await fetch(`${baseUrl}signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, discipline }),
    });
    if (res.status === 400)
      throw new Error('uno de los campos se rellenó de forma incorrecta ');
    else return res.json();
  } catch (err) {
    console.error(err);
  }
};

const authorize = async function ({ email, password }) {
  try {
    const res = await fetch(`${baseUrl}login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.status === 401) {
      throw new Error('Uno de los campos está mal');
    }
    if (res.status === 400) {
      throw new Error('No se ha proporcionado uno o más campos');
    } else {
      return res.json();
    }
  } catch (err) {
    console.error(err);
  }
};

const checkToken = async function (token) {
  try {
    const res = await fetch(`${baseUrl}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 400)
      throw new Error(
        'Token no proporcionado o proporcionado en formato incorrecto'
      );
    if (res.status === 401) throw new Error('El token provisto es inválido');
    else return res.json();
  } catch (err) {
    console.error(err);
  }
};

export { register, authorize, checkToken };
