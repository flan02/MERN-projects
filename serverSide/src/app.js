//TODO Configuramos en app todo el codigo del backend
import express from 'express'
import morgan from 'morgan'

const app = express()
app.use(morgan('dev'))
export default app