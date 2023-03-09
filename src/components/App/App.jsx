import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Form from '../Form/Form';
import About from '../About/About';
import Popup from '../Popup/Popup';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import BackgroundImg from '../BackgroundImg/BackgroundImg';
import Preloader from '../Preloader/Preloader';
import './app.css';
import translationApi from '../../utils/translationApi';
import api from '../../utils/api';
import { register, authorize, checkToken } from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { TextContext } from '../../contexts/TextContext';
import Sidebar from '../Sidebar/Sidebar';
import PopupWithConfirmation from '../PopupWithConfirmation/PopupWithConfirmation';
import UserContent from './../UserContent/UserContent';
import ProyectContent from './../ProyectContent/ProyectContent';
import ProtectedRoute from './../ProtectedRoute/ProtectedRoute';

import hiphopImg from '../../images/hip-hop-dance.jpg';
import graffitiImg from '../../images/graffiti.jpg';
import balletImg from '../../images/ballet.jpg';
import balletDancerImg from '../../images/ballet-woman.jpg';
import brushImg from '../../images/brush.jpg';
import potteryImg from '../../images/pottery.jpg';
import modelImg from '../../images/woman-model.jpg';

function App() {
  const { useState } = React;
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
  const [isUserPopupWithConfirmationOpen, setUserPopupWithConfirmationOpen] =
    useState(false);
  const [
    isProyectPopupWithConfirmationOpen,
    setProyectPopupWithConfirmationOpen,
  ] = useState(false);
  const [proyects, setProyects] = useState('');
  const [selectedProyect, setSelectedProyect] = useState('');

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
            navigation.current('/landing');
            setLoading(false);
          } else {
            setAuthorized(false);
            setLoading(false);
            navigation('/landing', { replace: true });
          }
        }
      } catch (err) {
        handleError(err);
      }
    })();
  }, [navigation]);

  React.useEffect(() => {
    (async function () {
      if (isAuthorized) {
        try {
          setLoading(true);
          const userInfo = await api.getUserInfo(jwt);
          const initialProyects = await api.getProyects();
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
    setUserPopupWithConfirmationOpen(false);
    setProyectPopupWithConfirmationOpen(false);
  }

  function handleOpenUserPopupWithConfirmation() {
    setUserPopupWithConfirmationOpen(true);
  }

  function handleOpenProyectPopupWithConfirmation() {
    setProyectPopupWithConfirmationOpen(true);
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
      const data = await api.updateUserInfo({
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
      const proyects = await api.getProyects();
      setProyects(proyects);
      setLoading(false);
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
      await api.updateUserCreatedInfo(proyectData.proyect._id);
      await handleAllProyectsRenderer();
      navigate('/home', { replace: true });
      handleSuccess();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleEditProyect(id) {
    try {
      setLoading(true);
      const originalData = await api.getProyect(id);
      if (!proyectName) setProyectName(originalData.proyectName);
      if (!city) setCity(originalData.city);
      if (!description) setDescription(originalData.description);
      if (!discipline) setDiscipline(originalData.discipline);
      if (!proyectPic) setProyectPic(originalData.proyectPic);

      const newData = await api.updateProyectInfo(
        {
          proyectName,
          city,
          description,
          discipline,
          proyectPic,
        },
        id
      );
      if (newData) {
        console.log(newData);
        await handleAllProyectsRenderer();
        navigate('/home', { replace: true });
        handleSuccess();
      } else {
        throw new Error('Algo salió mal');
      }
    } catch (err) {
      handleError(err);
    }
  }

  async function handleGetProyect(id) {
    try {
      setLoading(true);
      const data = await api.getProyect(id);
      setLoading(false);
      return data;
    } catch (err) {
      handleError(err);
    }
  }

  async function handleDeleteProyect() {
    try {
      setLoading(true);
      await api.deleteProyect(selectedProyect);
      handleAllProyectsRenderer();
      navigate('/home', { replace: true });
      handleSuccess();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleColaborate(proyectId) {
    try {
      setLoading(true);
      await api.updateProyectColaborations(proyectId);
      await api.updateUserColaborationsInfo(proyectId);
      handleAllProyectsRenderer();
      handleSuccess();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleSearch() {
    try {
      if (searchInput === '') return;
      setLoading(true);
      const proyects = await api.getProyects();
      const filteredProyects = proyects.filter((proyect) => {
        return (
          proyect.proyectName
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          proyect.description
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          proyect.discipline
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          proyect.city.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      setProyects(filteredProyects);
      navigate('/home');
      setLoading(false);
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
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

  function handleProfilePicChange(e) {
    setProfilePic(e.target.value);
  }

  function protectedRoutes() {
    return (
      <>
        <Route
          path="/home"
          element={
            <>
              <Sidebar onMyProyectsRenderer={handleMyProyectsRenderer} />
              <Main
                proyects={proyects}
                openPopupWithConfirmation={
                  handleOpenProyectPopupWithConfirmation
                }
                setSelectedProyect={setSelectedProyect}
              />
            </>
          }
        />
        <Route
          path="/users/:id"
          element={
            <>
              <UserContent
                elements={[
                  {
                    title: text.username,
                    value: 'username',
                    isInput: true,
                    onChange: handleUsernameChange,
                  },
                  {
                    title: text.discipline,
                    value: 'discipline',
                    name: 'discipline',
                    onChange: handleDisciplineChange,
                  },
                  {
                    value: 'profilePic',
                    isInput: true,
                    title: text.proyectImage,
                    onChange: handleProfilePicChange,
                  },
                  {
                    title: text.description,
                    value: 'description',
                    modifier: 'user-content__input_large',
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
                    value: 'createdProyects',
                  },
                  {
                    title: text.colaboratingIn,
                    value: 'colaboratingInProyects',
                  },
                ]}
                img={profilePic ? profilePic : graffitiImg}
                submitText="Edit"
                onSubmit={handleEditUser}
                openPopupWithConfirmation={handleOpenUserPopupWithConfirmation}
                disciplines={disciplines}
              />
              <BackgroundImg src={modelImg} />
            </>
          }
        />
        <Route
          path="/proyect/create"
          element={
            <>
              <Sidebar onMyProyectsRenderer={handleMyProyectsRenderer} />
              <Form
                inputs={[
                  {
                    name: 'proyectName',
                    type: 'text',
                    title: text.proyect,
                    errorMessage: text.proyectNameErrorMessage,
                    onChange: handleProyectNameChange,
                  },
                  {
                    name: 'proyectPic',
                    type: text,
                    title: text.proyectImage,
                    errorMessage: text.proyectPicErrorMessage,
                    onChange: handleProyectPicChange,
                  },
                  {
                    name: 'description',
                    type: 'text',
                    modifier: 'form__input_large',
                    title: text.description,
                    errorMessage: text.descriptionErrorMessage,
                    onChange: handleDescriptionChange,
                  },
                  {
                    name: 'city',
                    type: 'text',
                    title: text.city,
                    errorMessage: text.cityErrorMessage,
                    onChange: handleCityChange,
                  },
                  {
                    name: 'discipline',
                    title: text.discipline,
                    errorMessage: text.disciplineErrorMessage,
                    onChange: handleDisciplineChange,
                  },
                ]}
                formName={text.newProyectTitle}
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
              <ProyectContent
                elements={[
                  {
                    title: text.proyect,
                    value: 'proyectName',
                    isInput: true,
                    onChange: handleProyectNameChange,
                  },
                  {
                    value: 'proyectPic',
                    isInput: true,
                    title: text.proyectImage,
                    onChange: handleProyectPicChange,
                  },
                  {
                    value: 'discipline',
                    title: text.discipline,
                    onChange: handleDisciplineChange,
                  },
                  {
                    title: text.description,
                    value: 'description',
                    modifier: 'user-content__input_large',
                    onChange: handleDescriptionChange,
                    isLarge: true,
                    isInput: true,
                  },
                  {
                    title: text.city,
                    value: 'city',
                    onChange: handleCityChange,
                    isInput: true,
                  },
                  {
                    title: text.colaborators,
                    value: 'colaborators',
                  },
                ]}
                onEdit={handleEditProyect}
                onGetProyect={handleGetProyect}
                onColaborate={handleColaborate}
                openPopupWithConfirmation={
                  handleOpenProyectPopupWithConfirmation
                }
                disciplines={disciplines}
                setSelectedProyect={setSelectedProyect}
                submitText={text.colaborateBtn}
              />
              <BackgroundImg src={potteryImg} />
            </>
          }
        />
      </>
    );
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
            onSubmit={handleSearch}
          />
          <Preloader isLoading={isLoading} />
          <Routes>
            <Route
              path="/landing"
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
                        errorMessage: text.usernameErrorMessage,
                        onChange: handleUsernameChange,
                      },
                      {
                        name: 'email',
                        type: 'email',
                        title: 'Email',
                        errorMessage: text.emailErrorMessage,
                        onChange: handleEmailChange,
                      },
                      {
                        name: 'password',
                        type: 'password',
                        title: text.password,
                        errorMessage: text.passwordErrorMessage,
                        onChange: handlePasswordChange,
                      },
                      {
                        name: 'discipline',
                        type: 'discipline',
                        title: text.discipline,
                        errorMessage: text.disciplineErrorMessage,
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
              path="/*"
              element={
                <ProtectedRoute isAuthorized={isAuthorized}>
                  <Routes>{protectedRoutes()}</Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Popup
            popupError={popupError}
            isPopupOpen={isPopupOpen}
            onClose={handleClosePopup}
          />
          <PopupWithConfirmation
            isOpen={isUserPopupWithConfirmationOpen}
            onClose={handleClosePopupWithConfirmation}
            onDelete={handleDeleteUser}
          />
          <PopupWithConfirmation
            isOpen={isProyectPopupWithConfirmationOpen}
            onClose={handleClosePopupWithConfirmation}
            onDelete={handleDeleteProyect}
          />
          <Footer />
        </div>
      </TextContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
