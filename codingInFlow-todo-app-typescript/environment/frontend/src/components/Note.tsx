import styles from '../styles/Note.module.css'
import styleUtils from "../styles/utils.module.css"
import { Card } from "react-bootstrap"
import { Note as noteModel } from "../models/note"
import { formatDate } from '../utils/formatDate'
import { MdDelete } from "react-icons/md"

interface NoteProps {
    note: noteModel,
    onNote: (note: noteModel) => void,
    className?: string,
    onDelete: (note: noteModel) => void
}

const Note = ({ note, className, onDelete, onNote }: NoteProps) => {

    const { title, text, createdAt, updatedAt } = note
    let createUpdatedText: string
    if (updatedAt > createdAt) createUpdatedText = `Updated: ${formatDate(updatedAt)}`
    else createUpdatedText = `Created: ${formatDate(createdAt)}`

    return (
        <Card className={`${styles.noteCard} ${className}`} onClick={() => onNote(note)} >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e: Event) => {
                            onDelete(note)
                            e.stopPropagation()
                        }} />
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