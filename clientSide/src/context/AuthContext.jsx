/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import { createContext, useContext } from "react";
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null); //el usuario leido en toda la app.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState([])
  const [loading, setLoading] = useState(true)


  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      //console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch(error) {
      //console.log(error.response.data);
      setError(error.response.data)
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user)
      console.log(res);
      setIsAuthenticated(true)
      setUser(res.data)
    } catch(error) {
      if(Array.isArray(error.response.data)){
        return setError([error.response.data]) //el objeto lo convertimos a arreglo.
      }
    }
  }

  useEffect(() => {
    if(error.length > 0){
      const timer = setTimeout(() => {
        setError([])
      }, 3000);
      return () => clearTimeout(timer) //destruimos los timeout luego del cambio de estado
    }
  }, [error])

  //! Recordar los useEffect no pueden ser ASYNC-AWAIT
  //! Si la promesa dice PENDING es pq la peticion debe hacerse con ASYNC-AWAIT
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get()
      //console.log('El valor de las cookies es:', cookies.token)
      
      if(!cookies.token){ 
        setIsAuthenticated(false)
        setLoading(false)
        return setUser(null)
      } 
      try{
          //* PETICION AL BACKEND. Verifica qe un user malisioso no ingrese un token manualmente F12+cookies
          const res = await verifyTokenRequest(cookies.token)
          //console.log(res)
          if(!res.data){ //Sino devuelve nada el backend con ese token. Abortamos todo.
            setIsAuthenticated(false)
            setLoading(false)
            setUser(null)
            return
        }
        //TODO Si existe el token le habilitamos el acceso a las rutas privadas
        setIsAuthenticated(true)
        setUser(res.data)
        setLoading(false)
      }catch(error){
          setIsAuthenticated(false)
          setUser(null)
          setLoading(false)
        }
      
    } 
  checkLogin() //fc qe se ejecuta apenas carga la pagina.
}, [])
  

  return (
    <AuthContext.Provider value={{ loading, signup, signin, user, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
};
