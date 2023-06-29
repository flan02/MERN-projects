
import {} from 'dotenv/config'
import jwt from 'jsonwebtoken'

const TOKEN = process.env.TOKEN_SECRET //llave p/poder crear un Token

export function createAccessToken(payload){
    //objeto global de node.js
    return new Promise((resolve, reject) => {
    jwt.sign(
        payload, //recibe el ID del usuario y lo asocia al token
        TOKEN,
        {
            expiresIn: "1d"
        },
        (err, token) => {
            if(err) reject(err)
            resolve(token)
        })
    })
}