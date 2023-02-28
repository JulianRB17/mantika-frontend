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
import api from '../../utils/api';
import { register, authorize, checkToken } from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { TextContext } from '../../contexts/TextContext';

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
  const [isAuthorized, setAuthorized] = useState(false);
  const [searchInput, setSearchInput] = React.useState('');
  const [profilePic, setProfilePic] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userDiscipline, setUserDiscipline] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userCity, setUserCity] = useState('');
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

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    (async function () {
      try {
        if (token) {
          setLoading(true);
          const res = await checkToken(token);
          if (res.currentUser) {
            setJwt(token);
            setAuthorized(true);
            navigation.current('/');
            setLoading(false);
          } else {
            setAuthorized(false);
            setLoading(false);
            navigate('/', { replace: true });
          }
        }
      } catch (err) {
        handleError(err);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async function () {
      if (isAuthorized) {
        try {
          const userInfo = await api.getUserInfo(jwt);
          console.log(userInfo);
          // , api.getInitialCards()])
          // .then(([userInfo, cards]) => {
          setCurrentUser(userInfo.currentUser);
          // setCards(cards.cards);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [isAuthorized, jwt]);

  React.useEffect(() => {
    if (jwt) navigation.current('/home');
  }, [jwt, navigation]);

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

  async function handleEditUser() {
    try {
      setLoading(true);
      const data = await api.changeUserInfo({
        username,
        city: userCity,
        description: userDescription,
        discipline: userDiscipline,
        password,
        profilePic,
      });
      setPassword('');
      if (data) {
        navigate('/home', { replace: true });
      } else {
        throw new Error('Algo salió mal');
      }
      setLoading(false);
    } catch (err) {
      handleError(err);
    }
  }

  function handleLogout() {
    setEmail('');
    setJwt('');
    setAuthorized(false);
    localStorage.removeItem('jwt');
    navigate('/', { replace: true });
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
    setUserDescription(e.target.value);
  }

  function handleCityChange(e) {
    setUserCity(e.target.value);
    console.log(userCity);
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
    <CurrentUserContext.Provider value={currentUser}>
      <TextContext.Provider value={text}>
        <div className="app">
          <Header
            isAuthorized={isAuthorized}
            onLanguageChangeEn={handleLanguageChangeEn}
            onLanguageChangeEs={handleLanguageChangeEs}
            onChange={handleSearchInputChange}
            onLogout={handleLogout}
          />
          <Preloader isLoading={isLoading} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Landing />
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
                  <About />
                  <BackgroundImg src={balletDancerImg} />
                </>
              }
            />
            <Route
              path="/home"
              element={
                <>
                  <Sidebar />
                  <Main />
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
                        value: 'username',
                        isInput: true,
                        onChange: handleUsernameChange,
                      },
                      {
                        key: text.description,
                        value: 'description',
                        modifier: 'presentation__input_large',
                        isInput: true,
                        isLarge: true,
                        onChange: handleDescriptionChange,
                      },
                      {
                        key: text.city,
                        value: 'city',
                        isInput: true,
                        onChange: handleCityChange,
                      },
                      {
                        key: text.createdProyects,
                        value: 'createdProyects.length',
                      },
                      {
                        key: text.colaboratingIn,
                        value: 'colaboratingInProyects.length',
                      },
                    ]}
                    img={profilePic ? profilePic : graffitiImg}
                    submitText="Edit"
                    onSubmit={handleEditUser}
                  />
                  <BackgroundImg src={graffitiImg} />
                </>
              }
            />
            <Route
              path="/proyect/create"
              element={
                <>
                  <Sidebar />
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
      </TextContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
