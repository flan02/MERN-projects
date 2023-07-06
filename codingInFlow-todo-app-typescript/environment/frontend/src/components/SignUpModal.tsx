import { useForm } from "react-hook-form"
import { User } from "../models/user"
import { SignUpCredentials } from "../network/notes_api"
import * as NotesApi from "../network/notes_api"
import { Alert, Modal, Form, Button } from "react-bootstrap"
import TextInputField from "./form/TextInputField"
import styleUtils from "../styles/utils.module.css"
import { ConflictError } from "../errors/http_errors"
import { useState } from "react"
interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: (user: User) => void
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>()

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await NotesApi.signUp(credentials)
            onSignUpSuccessful(newUser)

        } catch (error) {
            if (error instanceof ConflictError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField type="text" name="username" label="Username" register={register} registerOptions={{ required: "Required" }} error={errors.username} placeholder="Username" />
                    <TextInputField type="email" name="email" label="Email" register={register} registerOptions={{ required: "Required" }} error={errors.email} placeholder="Email" />
                    <TextInputField type="password" name="password" label="Password" register={register} registerOptions={{ required: "Required" }} error={errors.password} placeholder="Password" />
                    <Button className={styleUtils.width100} type="submit" disabled={isSubmitting}>Sign Up</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SignUpModal;