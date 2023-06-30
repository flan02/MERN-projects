import { InferSchemaType, Schema, model } from "mongoose"
const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
},
    {
        timestamps: true
    })

//? Creamos un tipo con el schema de mongodb
type Note = InferSchemaType<typeof noteSchema>
//? Creamos la coleccion en mongodbAtlas
export default model<Note>("note", noteSchema)