//TODO Configuramos en app todo el codigo del backend
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use('/api', authRoutes) //diferenciamos asi las rutas de React
export default app