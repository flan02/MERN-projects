import { useState, useEffect } from 'react'
import { Note as noteModel } from './models/note'
import { Col, Container, Row } from 'react-bootstrap'
import Note from './components/Note'
import styles from './styles/NotesPage.module.css'

function App() {
  const [notes, setNotes] = useState<noteModel[]>([])

  useEffect(() => {
    async function getNotes() {
      try {
        const opts = {
          method: "GET", headers: {
            accept: 'application/json',
            'User-agent': 'learning app',
          }
        }
        //! en el package.json agregre "proxy": "http://localhost:5000" por errores de CORS.
        const response = await fetch("http://localhost:5000/api/notes", opts)
        const notes = await response.json()
        setNotes(notes)
      } catch (error) {
        console.error("The error es:", error)
        // alert(error)
      }
    }
    getNotes()
  }, []) //! Si no pasamos un array vacio se ejecutara en c/ render y es un comportamiento qe no deseamos.

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id} >
            <Note note={note} className={styles.note} />
          </Col>
        )
        )}
      </Row>

    </Container>
  )
}

export default App
