
import app from "./app"
import env from "./util/validateEnv"
import mongoose from "mongoose"
const port = 5000

const PORT = env.PORT;
const MONGO_CONNECTION_STRING = env.MONGO_CONNECTION_STRING

mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("mongoose connected 🎈")
        app.listen(PORT, () => {
            console.log(`Server running on port: http://localhost:${port}`);
        })
    })
    .catch(console.error)