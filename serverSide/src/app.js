//TODO Configuramos en app todo el codigo del backend
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/tasks.routes.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api', authRoutes) //diferenciamos asi las rutas de React
app.use('/api', taskRoutes)

export default app