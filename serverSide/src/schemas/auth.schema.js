import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username is required'
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be al least 6 characters'
    })
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    })
    .email({
        message: "Email is not valid."
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters'
    })
});

//Creo un middleware p/ validar la informacion que envie el usuario.
/* Gracias a zod los objetos que guardamos en las funciones tienen
el metodo parse que valida lo que se escriba
*/