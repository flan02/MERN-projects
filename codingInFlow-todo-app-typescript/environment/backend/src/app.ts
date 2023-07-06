import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import cors from 'cors'
import bodyParser from "body-parser"
import notesRoutes from "./routes/notes"
import userRouter from "./routes/users"
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session"
import env from "./util/validateEnv"
import MongoStore from "connect-mongo";
import { requiresAuth } from "./midleware/auth"; //* Este Middleware protege las rutas hasta qe el usuario se loguee


const opts: cors.CorsOptions = {
    methods: "GET,OPTIONS,PUT,POST,DELETE,PATCH",
    origin: "http://localhost:5173"
}
const SESSION_SECRET = env.SESSION_SECRET

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(bodyParser.json());
app.use(cors(opts))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    })
    //store: new session.MemoryStore() //*Guarda en memoria NO sirve p/ produccion
}))

app.use("/api/users", userRouter)
app.use("/api/notes", requiresAuth, notesRoutes)
app.use((_req, _res, next) => {
    next(createHttpError(404, "Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    let errMessage = "An unknown error occurred"
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
        errMessage = error.message
    }
    res.status(statusCode).json({ error: errMessage })
})

export default app //* Podemos darle el nombre qe qemos por el default