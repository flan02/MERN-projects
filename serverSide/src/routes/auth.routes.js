import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = Router()
router.post('/register', register)
router.post('/login', login)

//Añadimos las rutas creadas a la app de express.
export default router 