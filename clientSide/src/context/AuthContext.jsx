/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { registerRequest, loginRequest } from "../api/auth";
import { createContext, useContext } from "react";

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

  return (
    <AuthContext.Provider value={{ signup, signin, user, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
};
