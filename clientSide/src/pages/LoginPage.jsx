/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//! Para autenticarnos de verdad tenemos qe hacer una peticion al backend con axios, fetch, ajax.
//TODO La mayoria de apps modernas estan usando Axios.
// Axios utiliza fetch por debajo.

const LoginPage = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  
  const { signin, error: signinErrors } = useAuth();
  //console.log('El error es',signinErrors);
  //const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });

  return (
    <>
      <h1>Login</h1>
      <div>
        <form className="form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="em"></label>
            <input
              type="email"
              id="em"
              {...register("email", { required: true })}
              placeholder="email"
              autoComplete="on"
            />
            {errors.email && <p className="error">Email is required.</p>}
          </div>
          <div>
            <label htmlFor="pass"></label>
            <input
              type="password"
              id="pass"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="password"
            />
            {errors.password && <p className="error">password is required.</p>}
          </div>
          <div>
            <button type="submit">Login </button>
          </div>
          {signinErrors.map((err, i) => (
            <span className="box-error" key={i}>
              {err}
            </span>
          ))}
          <div>
            <p className="link-text">
            Dont have an account ? <Link className="link__link" to="/register">Sign up</Link>
            </p>
          </div>
        </form>
        
        
      </div>
    </>
  );
};

export default LoginPage;
