import { useState, useEffect } from 'react'
import { Note } from './models/note'


function App() {
  const [notes, setNotes] = useState<Note[]>([])

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
    <div className='App'>
      {JSON.stringify(notes)}
    </div>
  )
}

export default App
