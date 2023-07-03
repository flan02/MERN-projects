import { InferSchemaType, Schema, model } from 'mongoose';
//? por defecto el select es true, pero en este caso no queremos que se muestre el email y el password
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, select: false, unique: true },
    password: { type: String, required: true, select: false }
})

type User = InferSchemaType<typeof userSchema>
export default model<User>("user", userSchema)