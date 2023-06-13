/* eslint-disable no-unused-vars */
import axios from 'axios'
const opts = {
    headers: {'X-Requested-With': 'XMLHttpRequest'}
}
const API = 'http://localhost:3000/api'
// 2do param. es el req.body
export const registerRequest = (user) => axios.post(`${API}/register`, user)
