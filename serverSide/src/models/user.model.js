//Estructura fija para los datos en mongodb
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            max: 20
        }
    })

// crea una coleccion User y almacena datos que sigan el esquema del 2do param
const User = mongoose.model('User', userSchema)
export default User  // User.find(); User.remove(), etc