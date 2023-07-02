import { useState, useEffect } from 'react'
import { Note as noteModel } from './models/note'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Note from './components/Note'
import styles from './styles/NotesPage.module.css'
import stylesUtils from './styles/utils.module.css'
import * as NotesApi from "./network/notes_api"
import AddEditNote from './components/AddEditNote'
import { FaPlus } from "react-icons/fa"


function App() {
  const [notes, setNotes] = useState<noteModel[]>([])
  const [showAddNote, setShowAddNote] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<noteModel | null>(null)

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

  async function deleteNote(note: noteModel) {
    try {
      await NotesApi.deleteNote(note._id)
      setNotes(notes.filter((foundNote) => foundNote._id !== note._id))
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }


  return (
    <Container>
      <Button className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`} onClick={() => setShowAddNote(true)}>
        <FaPlus />
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id} >
            <Note note={note} onNote={setNoteToEdit} onDelete={deleteNote} className={styles.note} />
          </Col>
        )
        )}
      </Row>
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
