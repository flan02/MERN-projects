/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form"

//TODO Creamos un componente que nos permita reutilizar el código de los formularios
interface TextInputFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>, //TODO: Necesitamos que sea de tipo any porque no sabemos que tipo de dato vamos a recibir
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any //TODO: Necesitamos que sea de tipo any porque no sabemos que tipo de dato vamos a recibir
}

const TextInputField = ({ name, label, register, registerOptions, error, ...props }: TextInputFieldProps) => {
    return (
        <Form.Group className="mb-3" controlId={`${name}-input`} >
            <Form.Label>{label}</Form.Label>
            <Form.Control type="text" placeholder={label} isInvalid={!!error} {...register(name, registerOptions)} {...props} />
            <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
        </Form.Group>
    );
}

export default TextInputField;