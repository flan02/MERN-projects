//Estructura fija para los datos en mongodb
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    }, 
    {
        timestamps: true
    })

// crea una coleccion User y almacena datos que sigan el esquema del 2do param
const Users = mongoose.model('Users', userSchema)
export default Users  // User.find(); User.remove(), etc