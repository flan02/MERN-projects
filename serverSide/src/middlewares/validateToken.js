//TODO Middlewares son fc qe se ejecutaran antes de llegar a una ruta (entre req y res)

import { json } from 'express'
import jwt from 'jsonwebtoken'

//se encarga de proteger las rutas no te da acceso sino hay validacion del token
export const authRequired = (req, res, next) => {
    //? Distintas formas de acceder al encabezado y ver las cookies
    //console.log('validating token')
    //console.log(req.headers)
    //const token = req.headers.cookie
    //console.log(token)
    //const cookies = req.cookies
    //console.log(cookies)
    const { token } = req.cookies
    const TOKEN_SECRET = process.env.TOKEN_SECRET
    if(!token) return res.status(401).json({ message: "No token, authorization denied" })
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Invalid token" })
        //console.log(user);
        req.user = user // lo guardamos como prop del req p/ acceder a todas las rutas
        next()
    })
}

