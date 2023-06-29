/* eslint-disable no-unused-vars */
import axios from './axios'

//! Credentials: prop de axios p/ decirle qe establezca la cookie tmb cuando nosotros la utilizamos

// const API = 'http://localhost:3000/api'

// 2do param. es el req.body
export const registerRequest = (user) => axios.post("/register", user)
export const loginRequest = (user) => axios.post("/login", user)
export const verifyTokenRequest = () => axios.get("/verify") //comprueba si el usuario esta autenticado o no
