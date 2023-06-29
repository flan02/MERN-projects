
import mongoose from 'mongoose'
import {} from 'dotenv/config'

const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const CLUSTER = process.env.CLUSTER


export const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}.3how1p4.mongodb.net/?retryWrites=true&w=majority`)
        console.log('>>> DB is connected.');
    } catch (error) {
        console.log(error);
    }
}
