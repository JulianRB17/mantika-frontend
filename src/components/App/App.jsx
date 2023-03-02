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
import PopupWithConfirmation from '../PopupWithConfirmation/PopupWithConfirmation';
import Navigation from '../Navigation/Navigation';

function App() {
  const { useState } = React;
  const [popupName, setPopupName] = useState('login');
  const [isPopupOpen, setPopupOpen] = useState(true);
  const [jwt, setJwt] = useState('');
  const [isAuthorized, setAuthorized] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [proyectPic, setProyectPic] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [proyectName, setProyectName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState(translationApi.spanishObject);
  const [disciplines, setDisciplines] = useState(translationApi.disciplines);
  const [translated, setTranslated] = useState(false);
  const [popupError, setPopupError] = useState(false);
  const [isPopupWithConfirmationOpen, setPopupWithConfirmationOpen] =
    useState(false);
  const [proyects, setProyects] = useState('');

  const navigate = useNavigate();
  const navigation = React.useRef(useNavigate());

  function handleError(err) {
    console.error(err);
    setPopupError(true);
    setPopupOpen(true);
    setLoading(false);
  }

  function handleSuccess() {
    setLoading(false);
    setPopupError(false);
    setPopupOpen(true);
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
          setLoading(true);
          const userInfo = await api.getUserInfo(jwt);
          const initialProyects = await api.getInitialProyects();
          setCurrentUser(userInfo.currentUser);
          setProyects(initialProyects);

          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [isAuthorized, jwt]);

  React.useEffect(() => {
    if (jwt) navigation.current('/home');
  }, [jwt, navigation]);

  function handleClosePopup() {
    setPopupOpen(false);
  }

  function handleClosePopupWithConfirmation() {
    setPopupWithConfirmationOpen(false);
  }

  function handleOpenPopupWithConfirmation() {
    setPopupWithConfirmationOpen(true);
  }

  async function handleUserRegistration() {
    try {
      setLoading(true);
      const data = await register(username, email, password, discipline);
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        setJwt(data.token);
        setPassword('');
        navigate('/home', { replace: true });
        setAuthorized(true);
        handleSuccess();
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
        handleSuccess();
      } else {
        throw new Error('Algo salió mal');
      }
    } catch (err) {
      handleError(err);
    }
  }

  async function handleEditUser() {
    try {
      setLoading(true);
      const data = await api.changeUserInfo({
        username,
        city,
        description,
        discipline,
        password,
        profilePic,
      });

      if (data) {
        setCurrentUser(data.user);
        navigate('/home', { replace: true });
        handleSuccess();
      } else {
        throw new Error('Algo salió mal');
      }
    } catch (err) {
      handleError(err);
    }
  }

  function handleLogout() {
    setJwt('');
    setAuthorized(false);
    localStorage.removeItem('jwt');
    navigate('/', { replace: true });
  }

  async function handleDeleteUser() {
    try {
      await api.deleteUser(currentUser._id);
      handleLogout();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleCreateProyect() {
    try {
      setLoading(true);
      const proyectData = await api.createProyect({
        city,
        proyectName,
        description,
        discipline,
      });
      await api.changeUserCreatedInfo(proyectData.proyect._id);
      navigate('/home', { replace: true });
      handleSuccess();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleMyProyectsRenderer() {
    try {
      setLoading(true);
      const myProyectsData = await api.getMyProyects();
      setProyects(myProyectsData);
      setLoading(false);
    } catch (err) {
      handleError(err);
    }
  }

  async function handleAllProyectsRenderer() {
    try {
      setLoading(true);
      const proyects = await api.getInitialProyects();
      setProyects(proyects);
      setLoading(false);
    } catch (err) {
      handleError(err);
    }
  }

  async function handleEditProyect() {
    // try {
    //   setLoading(true);
    //   const data = await api.changeProyectInfo({
    //     proyectName,
    //     city,
    //     description,
    //     discipline,
    //     proyectPic,
    //   });
    //   if (data) {
    //     setCurrentUser(data.user);
    //     navigate('/home', { replace: true });
    //     handleSuccess();
    //   } else {
    //     throw new Error('Algo salió mal');
    //   }
    // } catch (err) {
    //   handleError(err);
    // }
  }

  async function handleGetProyect() {
    try {
    } catch (err) {
      handleError(err);
    }
  }

  async function handleLanguageChangeEn() {
    try {
      if (!translated) {
        setLoading(true);
        const englishText = await translationApi.createTranslatedObject();
        const englishDisciplines =
          await translationApi.createTranslatedDisciplines();
        setText(englishText);
        setDisciplines(englishDisciplines);
        setTranslated(true);
        setLoading(false);
      }
      if (translated) {
        setText(translationApi.translatedObject);
        setDisciplines(translationApi.translatedDisciplines);
      }
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

  function handleDisciplineChange(e) {
    setDiscipline(e.target.value);
  }

  function handleProyectNameChange(e) {
    setProyectName(e.target.value);
  }

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value);
  }

  function handleProyectPicChange(e) {
    setProyectPic(e.target.value);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <TextContext.Provider value={text}>
        <div className="app">
          <Header
            isAuthorized={isAuthorized}
            onLanguageChangeEn={handleLanguageChangeEn}
            onLanguageChangeEs={handleLanguageChangeEs}
            onAllProyectsRenderer={handleAllProyectsRenderer}
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
                        title: text.discipline,
                        onChange: handleDisciplineChange,
                      },
                    ]}
                    formName="Register"
                    submitText={text.registerBtn}
                    onSubmit={handleUserRegistration}
                    disciplines={disciplines}
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
                  <Sidebar onMyProyectsRenderer={handleMyProyectsRenderer} />
                  <Main proyects={proyects} />
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
                        title: text.username,
                        value: 'username',
                        isInput: true,
                        onChange: handleUsernameChange,
                      },
                      {
                        title: text.description,
                        value: 'description',
                        modifier: 'presentation__input_large',
                        isInput: true,
                        isLarge: true,
                        onChange: handleDescriptionChange,
                      },
                      {
                        title: text.city,
                        value: 'city',
                        isInput: true,
                        onChange: handleCityChange,
                      },
                      {
                        title: text.createdProyects,
                        value: 'createdProyects.length',
                      },
                      {
                        title: text.colaboratingIn,
                        value: 'colaboratingInProyects.length',
                      },
                      {
                        title: text.discipline,
                        name: 'discipline',
                        onChange: handleDisciplineChange,
                      },
                    ]}
                    img={profilePic ? profilePic : graffitiImg}
                    submitText="Edit"
                    onSubmit={handleEditUser}
                    openPopupWithConfirmation={handleOpenPopupWithConfirmation}
                    disciplines={disciplines}
                  />
                  <BackgroundImg src={graffitiImg} />
                </>
              }
            />
            <Route
              path="/proyect/create"
              element={
                <>
                  <Sidebar onMyProyectsRenderer={handleMyProyectsRenderer} />
                  <Form
                    img={graffitiImg}
                    inputs={[
                      {
                        name: 'proyectName',
                        type: 'text',
                        title: text.proyect,
                        onChange: handleProyectNameChange,
                      },
                      {
                        name: 'proyectDescription',
                        type: 'text',
                        modifier: 'form__input_large',
                        title: text.description,
                        onChange: handleDescriptionChange,
                      },
                      {
                        name: 'proyectCity',
                        type: 'text',
                        title: text.city,
                        onChange: handleCityChange,
                      },
                      {
                        name: 'proyectDiscipline',
                        type: 'text',
                        title: text.discipline,
                        onChange: handleDisciplineChange,
                      },
                    ]}
                    formName="Create a new proyect"
                    submitText={text.createBtn}
                    disciplines={disciplines}
                    onSubmit={handleCreateProyect}
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
                        value: proyectName,
                      },
                      {
                        key: text.description,
                        value: description,
                        modifier: 'presentation__input_large',
                        isLarge: true,
                      },
                      {
                        key: text.city,
                        value: city,
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
          <Popup
            popupError={popupError}
            isPopupOpen={isPopupOpen}
            onClose={handleClosePopup}
          />
          <PopupWithConfirmation
            isOpen={isPopupWithConfirmationOpen}
            onClose={handleClosePopupWithConfirmation}
            onDelete={handleDeleteUser}
          />
          <Footer />
        </div>
      </TextContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
