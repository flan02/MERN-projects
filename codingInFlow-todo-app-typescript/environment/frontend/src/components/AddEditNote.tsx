import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api"; // es una interface
import * as NotesApi from '../network/notes_api'
import TextInputField from "./form/TextInputField";

interface AddEditNoteProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void
}

const AddEditNote = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || ""
        }
    })
    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: Note
            if (noteToEdit) noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
            else noteResponse = await NotesApi.createNote(input)
            onNoteSaved(noteResponse)
        } catch (error) {
            //console.error(error)
            alert(error)
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>{noteToEdit ? "Edit note" : "Add note"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField type="text" name="title" label="Title" register={register} registerOptions={{ required: "Required" }} error={errors.title} placeholder="Title" />
                    {/*
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" isInvalid={!!errors.title} {...register("title", { required: "Required" })} />
                        <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
                    </Form.Group>
                    */}
                    <TextInputField as="textarea" rows={5} name="text" label="Text" register={register} placeholder="Text" />
                    {/*
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Text" {...register("text", { required: "Required" })} />
                    </Form.Group >
                    */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNote;