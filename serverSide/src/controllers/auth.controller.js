import Users from '../models/user.model.js' 
import bcrypt from 'bcryptjs'

import { createAccessToken } from '../helpers/jwt.js'
//* https://jwt.io/   Validamos los tokens generados

export const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
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
export const login = (req, res) => {
    //res.send('login')
}

