import Users from '../models/user.model.js' 
import bcrypt from 'bcryptjs'

import { createAccessToken } from '../helpers/jwt.js'
//* https://jwt.io/   Validamos los tokens generados

export const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const userFound = await Users.findOne({ email })
        if(userFound) return res.status(400).json([`the email ${email} is already in use.`])
        const passwordHash = await bcrypt.hash(password, 10)
        const User = new Users({
            username,
            email,
            password: passwordHash
        })
        const userSaved = await User.save()
    //? credenciales de usuario
    const token = await createAccessToken({ id: userSaved._id })
    res.cookie("token", token)
    //res.json({ message: "User created successfully" })
    //? datos para el frontend
    res.json({
        id: userSaved._id,
        username: userSaved.username,
        email : userSaved.email,
        createAt: userSaved.createdAt,
        updateAt: userSaved.updatedAt
    })
    }catch(error){
        //console.log(error)
        res.status(500).json({ message: error.message })
    } 
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const userFound = await Users.findOne({email})
        if(!userFound) return res.status(400).json(["User not found"])
        const isMatch = await bcrypt.compare(password, userFound.password)
        if(!isMatch) return res.status(400).json({message: "Incorrect credentials."})
    //? Token p/ validar la sesion
        const token = await createAccessToken({ id: userFound._id })

    res.cookie("token", token)
    //? datos para el frontend
    res.json({
        id: userFound._id,
        username: userFound.username,
        email : userFound.email,
        createAt: userFound.createdAt,
        updateAt: userFound.updatedAt
    })
    }catch(error){
        //console.log(error)
        res.status(500).json({ message: error.message })
    } 
}


export const logout = async (_req, res) => {
    res.cookie("token", "", {
        expires: new Date(0) // se elimina el token luego de iniciar sesion, podemos programarle una caducidad.
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    //console.log(req.user)
    const userFound = await Users.findById(req.user.id)
    if(!userFound) return res.status(400).json({ message: "User not found."})
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        crateAt: userFound.createdAt,
        updateAt: userFound.updatedAt
    })
} 