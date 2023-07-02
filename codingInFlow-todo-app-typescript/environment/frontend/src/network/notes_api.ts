import { Note } from "../models/note"

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init)
    if (!response.ok) {
        const errorBody = await response.json()
        const errorMessage = errorBody.error()
        throw Error(errorMessage)
    }
    return response
}

export async function fetchNotes(): Promise<Note[]> {
    const opts = {
        method: "GET", headers: {
            accept: 'application/json',
            'User-agent': 'learning app',
        }
    }
    //! en el package.json agregre "proxy": "http://localhost:5000" por errores de CORS.
    const response = await fetchData("http://localhost:5000/api/notes", opts)
    return response.json()
}

export interface NoteInput {
    title: string
    text?: string
}

export async function createNote(note: NoteInput): Promise<Note> {
    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    }
    const response = await fetchData("http://localhost:5000/api/notes", opts)
    return response.json()
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const opts = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    }
    const response = await fetchData(`http://localhost:5000/api/notes/${noteId}`, opts)
    return response.json()
}

export async function deleteNote(noteId: string) {
    const opts = {
        method: "DELETE"
    }
    await fetchData(`http://localhost:5000/api/notes/${noteId}`, opts)
}