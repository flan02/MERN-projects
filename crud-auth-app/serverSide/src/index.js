//TODO desde aqui arrancamos la aplicacion
import app from "./app.js";
import { connectDB } from "./db.js";

connectDB()
app.listen(3000)
const PORT = process.env.PORT || 3000
console.log(`Server on running at http://localhost:${PORT}`);