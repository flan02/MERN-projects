import { Note } from "../models/note"
import { User } from "../models/user"

//TODO fetchData es la funcion generica que se encarga de hacer las peticiones a la API
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

export async function getLoggedInUser(): Promise<User> {
    const opts = {
        method: "GET"
    }
    const response = await fetchData("http://localhost:5000/api/users", opts)
    return response.json()
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }
    const response = await fetchData("http://localhost:5000/api/users/signup", opts)
    return response.json()
}

export interface LoginCredentials {
    username: string,
    password: string
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }
    const response = await fetchData("http://localhost:5000/api/users/login", opts)
    return response.json()
}

export async function logout() {
    const opts = {
        method: "POST"
    }
    await fetchData("http://localhost:5000/api/users/logout", opts)
}