import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Form from '../Form/Form';
import About from '../About/About';
import Popup from '../Popup/Popup';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Presentation from '../Presentation/Presentation';
import BackgroundImg from '../BackgroundImg/BackgroundImg';
import Preloader from '../Preloader/Preloader';
import './app.css';
import translationApi from '../../utils/translationApi';

import { register, authorize, checkToken } from '../../utils/auth';

import hiphopImg from '../../images/hip-hop-dance.jpg';
import graffitiImg from '../../images/graffiti.jpg';
import balletImg from '../../images/ballet.jpg';
import balletDancerImg from '../../images/ballet-woman.jpg';
import brushImg from '../../images/brush.jpg';
import Sidebar from '../Sidebar/Sidebar';

function App() {
  const { useState } = React;
  const [popupName, setPopupName] = useState('login');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [jwt, setJwt] = useState('');
  const [isAuthorized, setAuthorized] = useState(true);
  const [searchInput, setSearchInput] = React.useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userDiscipline, setUserDiscipline] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [colaboratingInProyects, setcolaboratingInProyects] = useState('');
  const [createdProyects, setCreatedProyects] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [currentProyectName, setCurrentProyectName] = useState('');
  const [currentProyectDescription, setCurrentProyectDescription] =
    useState('');
  const [currentProyectDiscipline, setCurrentProyectDiscipline] = useState('');
  const [currentProyectCity, setCurrentProyectCity] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState(translationApi.spanishObject);
  const [translated, setTranslated] = useState(false);

  const navigate = useNavigate();
  const navigation = React.useRef(useNavigate());

  function handleError(err) {
    console.error(err);
    setLoading(false);
  }

  async function handleUserRegistration() {
    try {
      setLoading(true);
      const data = await register(username, email, password, userDiscipline);
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        setJwt(data.token);
        setPassword('');
        navigate('/home', { replace: true });
        setAuthorized(true);
        setLoading(false);
      } else {
        throw new Error('Algo salió mal');
      }
    } catch (err) {
      handleError(err);
    }
  }
  async function handleLogin() {
    try {
      setLoading(true);
      const data = await authorize(email, password);
      if (data.token) {
        setJwt(data.token);
        localStorage.setItem('jwt', data.token);
        setPassword('');
        navigate('/home', { replace: true });
        setAuthorized(true);
      } else {
        throw new Error('Algo salió mal');
      }
      setLoading(false);
    } catch (err) {
      handleError(err);
    }
  }

  async function handleLanguageChangeEn() {
    try {
      if (!translated) {
        setLoading(true);
        const englishText = await translationApi.createTranslatedObject();
        setText(englishText);
        setLoading(false);
      }
      if (translated) {
        setText(translationApi.translatedObject);
      }
      setTranslated(true);
    } catch (err) {
      handleError(err);
    }
  }

  function handleLanguageChangeEs() {
    setText(translationApi.spanishObject);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleCityChange(e) {
    setCity(e.target.value);
  }

  function handleUserDiscipline(e) {
    setUserDiscipline(e.target.value);
  }

  function handleCurrentProyectDiscipline(e) {
    setCurrentProyectDiscipline(e.target.value);
  }

  function handleCurrentProyectDescriptionChange(e) {
    setCurrentProyectDescription(e.target.value);
  }

  function handleCurrentProyectNameChange(e) {
    setCurrentProyectName(e.target.value);
  }

  function handleCurrentProyectCityChange(e) {
    setCurrentProyectCity(e.target.value);
  }

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <div className="app">
      <Header
        isAuthorized={isAuthorized}
        username={username}
        onLanguageChangeEn={handleLanguageChangeEn}
        onLanguageChangeEs={handleLanguageChangeEs}
        onChange={handleSearchInputChange}
      />
      <Preloader isLoading={isLoading} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing text={text} />
              <BackgroundImg src={hiphopImg} />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Form
                inputs={[
                  {
                    name: 'username',
                    type: 'text',
                    title: text.username,
                    onChange: handleUsernameChange,
                  },
                  {
                    name: 'email',
                    type: 'email',
                    title: 'Email',
                    onChange: handleEmailChange,
                  },
                  {
                    name: 'password',
                    type: 'password',
                    title: text.password,
                    onChange: handlePasswordChange,
                  },
                  {
                    name: 'discipline',
                    type: 'text',
                    title: text.discipline,
                    onChange: handleUserDiscipline,
                  },
                ]}
                formName="Register"
                submitText={text.registerBtn}
                onSubmit={handleUserRegistration}
              />
              <BackgroundImg src={graffitiImg} />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Form
                inputs={[
                  {
                    name: 'email',
                    type: 'email',
                    title: 'Email',
                    onChange: handleEmailChange,
                  },
                  {
                    name: 'password',
                    type: 'password',
                    title: text.password,
                    onChange: handlePasswordChange,
                  },
                ]}
                formName="Login"
                submitText="Login"
                onSubmit={handleLogin}
              />
              <BackgroundImg src={balletImg} />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <About text={text} />
              <BackgroundImg src={balletDancerImg} />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Sidebar text={text} />
              <Main text={text} />
            </>
          }
        />
        <Route
          path="/users/:id"
          element={
            <>
              <Presentation
                elements={[
                  {
                    key: text.username,
                    value: { username },
                    isInput: true,
                    onChange: handleUsernameChange,
                  },
                  {
                    key: text.description,
                    value: description,
                    modifier: 'presentation__input_large',
                    isInput: true,
                    isLarge: true,
                    onChange: handleDescriptionChange,
                  },
                  {
                    key: text.city,
                    value: city,
                    isInput: true,
                    onChange: handleCityChange,
                  },
                  { key: text.createdProyects, value: createdProyects.length },
                  {
                    key: text.colaboratingIn,
                    value: colaboratingInProyects.length,
                  },
                ]}
                img={graffitiImg}
                submitText="Edit"
              />
              <BackgroundImg src={graffitiImg} />
            </>
          }
        />
        <Route
          path="/proyect/create"
          element={
            <>
              <Sidebar text={text} />
              <Form
                img={graffitiImg}
                inputs={[
                  {
                    name: 'proyectName',
                    type: 'text',
                    title: text.proyect,
                    onChange: handleCurrentProyectNameChange,
                  },
                  {
                    name: 'proyectDescription',
                    type: 'text',
                    modifier: 'form__input_large',
                    title: text.description,
                    onChange: handleCurrentProyectDescriptionChange,
                  },
                  {
                    name: 'proyectCity',
                    type: 'text',
                    title: text.city,
                    onChange: handleCurrentProyectCityChange,
                  },
                  {
                    name: 'proyectDiscipline',
                    type: 'text',
                    title: text.discipline,
                    onChange: handleCurrentProyectDiscipline,
                  },
                ]}
                formName="Create a new proyect"
                submitText={text.createBtn}
              />

              <BackgroundImg src={brushImg} />
            </>
          }
        />
        <Route
          path="/proyect/:id"
          element={
            <>
              <Presentation
                text={text}
                img={balletDancerImg}
                elements={[
                  {
                    key: text.proyect,
                    value: currentProyectName,
                  },
                  {
                    key: text.description,
                    value: currentProyectDescription,
                    modifier: 'presentation__input_large',
                    isLarge: true,
                  },
                  {
                    key: text.city,
                    value: currentProyectCity,
                  },
                  { key: text.colaborators, value: 30 },
                ]}
                submitText={text.colaborateBtn}
              />
              <BackgroundImg src={balletDancerImg} />
            </>
          }
        />
      </Routes>
      <Popup popupName={popupName} isPopupOpen={isPopupOpen} />
      <Footer />
    </div>
  );
}

export default App;
