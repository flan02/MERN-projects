import { useForm } from 'react-hook-form'
import { registerRequest } from '../api/auth'
//! Para autenticarnos de verdad tenemos qe hacer una peticion al backend con axios, fetch, ajax.
//TODO La mayoria de apps modernas estan usando Axios.
// Axios utiliza fetch por debajo.

const RegisterPage = () => {

    const { register, handleSubmit } = useForm()

  return (
    <>
        <h1>Register</h1>
        <div >
            <form  className="form" onSubmit={handleSubmit(async (values) => {
                console.log(values)
                const res = await registerRequest(values)
                console.log(res)
            })} >
            <div>
                <label htmlFor="user"></label>
                    <input type="text" id="user"
                        { ...register("username", { required: true })} 
                        placeholder='username'
                        />
            </div>
            <div>
                <label htmlFor="em"></label>
                    <input type="email" id="em"
                    { ...register("email", { required: true })} 
                        placeholder='email'
                    />
            </div>
            <div>
                <label htmlFor="pass"></label>
                <input type="password" id="pass"
                    { ...register("password", { required: true, minLength: 6 })} 
                        placeholder='password'
                    />
            </div>
            <div>
                <button type="submit"> Register </button>
            </div>
            </form>
        </div>
    </>
  )
}

export default RegisterPage