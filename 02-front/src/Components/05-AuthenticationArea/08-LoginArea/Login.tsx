import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Login.module.css"
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";

import { useDispatch } from "react-redux";
import { login } from "../../../Redux/UserSlice";

function Login():JSX.Element {

  const [error,setError] = useState(null);
  const { register, handleSubmit,formState ,reset} = useForm<CredentialsModel>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    reset();
  },[]);

  async function  submit(credentials: CredentialsModel) {
    try {
      setError(null);
      const token = await authService.login(credentials);
      dispatch(login(token));
      alert("logged in successfully")
      navigate("/home");
      reset();
    } 
    catch(err:any) {
      setError(err.response.data);
    }
  }
    return <section>
      <h2 className={classes.loginTitle}>Login</h2>
      <form className={classes.login} onSubmit={handleSubmit(submit)}>
        <label>
          <span>User Name:</span>
          <input
            {...register("userName",{
              required : {value: true , message: "User Name is required"}
            })}
          />
          <span 
            className={formState.errors.userName?.message ? `${classes.errorMessage} ${classes.error}` : classes.errorMessage}>
              {formState.errors.userName?.message ? formState.errors.userName?.message: "error"}
          </span>
        </label>

        <label>
          <span>Password:</span>
          <input
            type="password"
            {...register("password",{
              required : {value: true , message: "password is required"}
            })}
          />
          <span 
            className={formState.errors.password?.message ? `${classes.errorMessage} ${classes.error}` : classes.errorMessage}>
              {formState.errors.password?.message ? formState.errors.password?.message: "error"}
          </span>
        </label>

        <button className={classes.btn} type="submit">Login</button>
        <span 
          className={error ? `${classes.errorMessage} ${classes.error}` : classes.errorMessage}>
          {error? error : "error"}
        </span>
      </form>
    </section>
}

export default Login;