/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//! Para autenticarnos de verdad tenemos qe hacer una peticion al backend con axios, fetch, ajax.
//TODO La mayoria de apps modernas estan usando Axios.
// Axios utiliza fetch por debajo.

const RegisterPage = () => {
    const { register, handleSubmit, formState: {
      errors
    } } = useForm();
    const { signup, user, isAuthenticated, error: signupErrors } = useAuth();
    const navigate = useNavigate()
    //console.log(user) // Vemos si el contexto global recibio el usuario que se registro
    useEffect(() => {
      if(isAuthenticated) navigate("/tasks");
    }, [isAuthenticated])
    
    
    const onSubmit = handleSubmit(async (values) => {
    signup(values)
  });
  return (
    <>
      <h1>Register</h1>
      <div>
        <form className="form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="user"></label>
            <input
              type="text"
              id="user"
              {...register("username", { required: true })}
              placeholder="username"
              autoComplete="on"
            />
            {
              errors.username && <p className="error">Username is required.</p>
            }
          </div>
          <div>
            <label htmlFor="em"></label>
            <input
              type="email"
              id="em"
              {...register("email", { required: true })}
              placeholder="email"
              autoComplete="on"
            />
            {
              errors.email  && <p className="error">Email is required.</p>
            }
          </div>
          <div>
            <label htmlFor="pass"></label>
            <input
              type="password"
              id="pass"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="password"
            />
            {
              errors.password && <p className="error">password is required.</p>
            }
          </div>
          <div>
            <button type="submit"> Register </button>
          </div>
            {
              signupErrors.map((err, i) => (<span className="box-error" key={i} >{err}</span>))
            }
            <div>
            <p className="link-text">
            Already have an account ? <Link className="link__link" to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
