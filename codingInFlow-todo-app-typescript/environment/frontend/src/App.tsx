import { Container } from 'react-bootstrap'
import NavBar from './components/NavBar'
import SignUpModal from './components/SignUpModal'
import LoginModal from './components/LoginModal'
import styles from './styles/NotesPage.module.css'
import { User } from './models/user'
import { useEffect, useState } from 'react'
import * as NotesApi from './network/notes_api'
import NotePagesLoggedInView from './components/NotePagesLoggedInView'
import NotePagesLoggetOutView from './components/NotePagesLoggetOutView'



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
        console.error(error)
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
