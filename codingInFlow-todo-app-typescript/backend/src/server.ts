import express from "express";
const app = express()
const port = 5000
app.get("/", (req, res) => {
    res.send("hello Ollie!. I'm using hot reloading with nodemon and ts-node.")
})
app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
})