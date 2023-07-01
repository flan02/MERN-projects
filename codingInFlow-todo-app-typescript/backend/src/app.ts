import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes"
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors";

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use("/api/notes", notesRoutes)
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errMessage = "An unknown error occurred"
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
        errMessage = error.message
    }
    res.status(statusCode).json({ error: errMessage })
})

export default app //* Podemos darle el nombre qe qemos por el default