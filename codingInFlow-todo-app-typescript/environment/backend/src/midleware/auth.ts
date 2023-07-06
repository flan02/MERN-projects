import { RequestHandler } from "express"
import createHttpError from "http-errors"

//TODO Crear un middleware que proteja las rutas hasta que el usuario se loguee y pueda acceder a sus notas.
export const requiresAuth: RequestHandler = (req, res, next) => {
    if (req.session.userId) next()
    else next(createHttpError(401, "User not authenticated"))
}