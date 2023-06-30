import "dotenv/config"
import express from "express";

const app = express()

app.get("/", (req, res) => {
    res.send("I'm using hot reloading with nodemon and ts-node.")
})

export default app