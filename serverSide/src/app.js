//TODO Configuramos en app todo el codigo del backend
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/tasks.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173' // o indicamos qe solo se comuniqe dominio
})) // si no ponemos 'origin' permitimos qe todos los dominios se comuniqen en este servidor.
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api', authRoutes) 
app.use('/api', taskRoutes)

export default app