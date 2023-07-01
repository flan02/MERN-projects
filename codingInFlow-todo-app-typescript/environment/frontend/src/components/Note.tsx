import styles from '../styles/Note.module.css'
import { Card } from "react-bootstrap"
import { Note as noteModel } from "../models/note"
import { formatDate } from '../utils/formatDate'
interface NoteProps {
    note: noteModel,
    className?: string
}

const Note = ({ note, className }: NoteProps) => {
    const { title, text, createdAt, updatedAt } = note
    let createUpdatedText: string
    if (updatedAt > createdAt) createUpdatedText = `Updated: ${formatDate(updatedAt)}`
    else createUpdatedText = `Created: ${formatDate(createdAt)}`
    return (
        <Card className={`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
                <Card.Footer className="text-muted">
                    {createUpdatedText}
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default Note