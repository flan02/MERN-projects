/* eslint-disable react/prop-types */

import { useState } from "react";
import { registerRequest } from "../api/auth";
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
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data)
    }
  };

  return (
    <AuthContext.Provider value={{ signup, user, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
};
