import { useState, useEffect } from 'react'
import { Note as noteModel } from './models/note'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Note from './components/Note'
import styles from './styles/NotesPage.module.css'
import stylesUtils from './styles/utils.module.css'
import * as NotesApi from "./network/notes_api"
import AddNote from './components/AddNote'

function App() {
  const [notes, setNotes] = useState<noteModel[]>([])
  const [showAddNote, setShowAddNote] = useState(false)

  useEffect(() => {
    async function getNotes() {
      try {
        const notes = await NotesApi.fetchNotes()
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
      <Button className={`mb-4 ${stylesUtils.blockCenter}`} onClick={() => setShowAddNote(true)}>
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id} >
            <Note note={note} className={styles.note} />
          </Col>
        )
        )}
      </Row>
      {showAddNote && <AddNote onDismiss={() => setShowAddNote(false)} onNoteSaved={(newNote) => {
        setNotes([...notes, newNote])
        setShowAddNote(false)
      }} />}
    </Container>
  )
}

export default App
