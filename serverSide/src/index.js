//TODO desde aqui arrancamos la aplicacion
import app from "./app.js";
import { connectDB } from "./db.js";
connectDB()
app.listen(3000)
console.log('Server on PORT at http://localhost:3000', 3000);