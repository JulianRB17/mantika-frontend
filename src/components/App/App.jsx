import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Form from '../Form/Form';
import About from '../About/About';
import Popup from '../Popup/Popup';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Presentation from '../Presentation/Presentation';
import BackgroundImg from '../BackgroundImg/BackgroundImg';
import './app.css';

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

  return (
    <div className="app">
      <Header isLoggedIn={true} username="El Julis" />
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
                  { name: 'username', type: 'text', title: 'Username' },
                  { name: 'email', type: 'email', title: 'Email' },
                  { name: 'password', type: 'password', title: 'Password' },
                  { name: 'discipline', type: 'text', title: 'Discipline' },
                ]}
                formName="Register"
                submitText="Register"
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
                  { name: 'username', type: 'text', title: 'Username' },
                  { name: 'password', type: 'password', title: 'Password' },
                ]}
                formName="Login"
                submitText="Login"
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
                    key: 'Username:',
                    value: 'El Julián',
                    isInput: true,
                  },
                  {
                    key: 'Description:',
                    value:
                      'Un texto largo que me describe así bien locoshonamente',
                    modifier: 'presentation__input_large',
                    isInput: true,
                    isLarge: true,
                  },
                  {
                    key: 'City:',
                    value: 'La CDMX',
                    isInput: true,
                  },
                  { key: 'Created proyects:', value: 5 },
                  { key: 'Colaborating in:', value: 3 },
                ]}
                img={graffitiImg}
                submitText="Edit"
              />
              <BackgroundImg src={graffitiImg} />
            </>
          }
        />
        <Route
          path="/proyect/registration"
          element={
            <>
              <Sidebar />
              <Form
                img={graffitiImg}
                inputs={[
                  { name: 'proyectName', type: 'text', title: 'Proyect name' },
                  {
                    name: 'description',
                    type: 'text',
                    modifier: 'form__input_large',
                    title: 'Description',
                  },
                  { name: 'discipline', type: 'text', title: 'Discipline' },
                ]}
                formName="Create a new proyect"
                submitText="Create"
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
                    key: 'Proyect:',
                    value: 'Los Obscenos de Silere/Vórtex',
                  },
                  {
                    key: 'Description:',
                    value:
                      'Una obra bien crazy que está así bien loka sobre vijes en el tiempo y así',
                    modifier: 'presentation__input_large',
                    isLarge: true,
                  },
                  {
                    key: 'City:',
                    value: 'La CDMX',
                  },
                  { key: 'Colaborators:', value: 30 },
                ]}
                submitText="Colaborate"
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
