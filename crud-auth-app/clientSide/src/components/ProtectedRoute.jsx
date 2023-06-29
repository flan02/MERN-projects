/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = () => {
    const { user, isAuthenticated, loading } = useAuth() //tiene qe estar dentro del contexto el componente p/ acceder
    //console.log(loading, isAuthenticated);
    if(loading) return <h1>Loading...</h1>
    if(!loading && !isAuthenticated) return <Navigate  to='/login' replace />
    
    return (
        <Outlet /> // le decimos qe continue con el componente qe esta adentro de este.
  )
}

export default ProtectedRoute