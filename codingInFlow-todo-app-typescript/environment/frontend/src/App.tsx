import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as NotesApi from "./network/notes_api";
import NotesPage from './pages/NotesPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPage from './pages/PrivacyPage';
import styles from "./styles/App.module.css";

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        //console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedIn={loggedInUser}
          onLogin={() => setShowLoginModal(true)}
          onSignUp={() => setShowSignUpModal(true)}
          onLogoutSuccess={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path='/'
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route
              path='/privacy'
              element={<PrivacyPage />}
            />
            <Route
              path='/*'
              element={<NotFoundPage />}
            />
          </Routes>
        </Container>
        {showSignUpModal &&
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        }
        {showLoginModal &&
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccess={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        }
      </div>
    </BrowserRouter>
  );
}

export default App;


/*
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import LoginModal from './components/LoginModal'
import NavBar from './components/NavBar'
import NotePagesLoggedInView from './components/NotePagesLoggedInView'
import NotePagesLoggetOutView from './components/NotePagesLoggetOutView'
import SignUpModal from './components/SignUpModal'
import { User } from './models/user'
import styles from './styles/NotesPage.module.css'
import * as NotesApi from "./network/notes_api"


function App() {
  const [loggedIn, setLoggedIn] = useState<User | null>(null)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const user = await NotesApi.getLoggedInUser()
        setLoggedIn(user)
      } catch (error) {
        //console.error(error)
      }
    }
    checkLoggedIn()
  }, [])
  return (
    <div>
      <NavBar loggedIn={loggedIn} onSignUp={() => setShowSignUp(true)} onLogin={() => { setShowLogin(true) }} onLogoutSuccess={() => setLoggedIn(null)} />
      <Container className={styles.notesPage}>
        <>
          {loggedIn ? <NotePagesLoggedInView /> : <NotePagesLoggetOutView />}
        </>
        {showSignUp && <SignUpModal onDismiss={() => setShowSignUp(false)} onSignUpSuccessful={(user) => {
          setLoggedIn(user)
          setShowSignUp(false)
        }} />}
        {showLogin && <LoginModal onDismiss={() => setShowLogin(false)} onLoginSuccess={(user) => {
          setLoggedIn(user)
          setShowLogin(false)
        }} />}
      </Container>
    </div>
  )
}

export default App
*/