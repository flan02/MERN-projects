import mongoose from 'mongoose'


export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://flan02:n5UvmrGtU2IIUx6a@cluster-rack.3how1p4.mongodb.net/?retryWrites=true&w=majority')
        console.log('>>> DB is connected.');
    } catch (error) {
        console.log(error);
    }
}
