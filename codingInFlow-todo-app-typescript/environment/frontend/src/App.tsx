import { useState, useEffect } from 'react'
import { Note as noteModel } from './models/note'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import Note from './components/Note'
import styles from './styles/NotesPage.module.css'
import stylesUtils from './styles/utils.module.css'
import * as NotesApi from "./network/notes_api"
import AddEditNote from './components/AddEditNote'
import { FaPlus } from "react-icons/fa"


function App() {
  const [notes, setNotes] = useState<noteModel[]>([])
  const [notesLoading, setNotesLoading] = useState(true)
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)
  const [showAddNote, setShowAddNote] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<noteModel | null>(null)

  useEffect(() => {
    async function getNotes() {
      try {
        setShowNotesLoadingError(false)
        setNotesLoading(true)
        const notes = await NotesApi.fetchNotes()
        setNotes(notes)
      } catch (error) {
        setShowNotesLoadingError(true)
      } finally {
        setNotesLoading(false)
      }
    }
    getNotes()
  }, []) //! Si no pasamos un array vacio se ejecutara en c/ render y es un comportamiento qe no deseamos.

  async function deleteNote(note: noteModel) {
    try {
      await NotesApi.deleteNote(note._id)
      setNotes(notes.filter((foundNote) => foundNote._id !== note._id))
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  const notesGrid =
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid} `}>
      {notes.map((note) => (
        <Col key={note._id} >
          <Note note={note} onNote={setNoteToEdit} onDelete={deleteNote} className={styles.note} />
        </Col>
      ))}
    </Row>

  return (
    <Container className={styles.notesPage}>
      <Button className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`} onClick={() => setShowAddNote(true)}>
        <FaPlus />
        Add new note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && <p>Something went wrong. Please refresh the page</p>}
      {!notesLoading && !showNotesLoadingError &&
        <>
          {
            notes.length > 0 ? notesGrid : <p className={stylesUtils.blockCenter}>No notes found</p> //? Si es true, se ejecuta notesGrid, si es false, se ejecuta el parrafo  
          }
        </>
      }
      {showAddNote && <AddEditNote onDismiss={() => setShowAddNote(false)} onNoteSaved={(newNote) => {
        setNotes([...notes, newNote])
        setShowAddNote(false)
      }} />}
      {noteToEdit && <AddEditNote noteToEdit={noteToEdit} onDismiss={() => setNoteToEdit(null)} onNoteSaved={(updatedNote) => {
        setNotes(notes.map((noteFound) => noteFound._id === updatedNote._id ? updatedNote : noteFound))
        setNoteToEdit(null)
      }} />}
    </Container>
  )
}

export default App
