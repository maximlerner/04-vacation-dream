import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./Login.module.css"
import config from "../../../Utils/Config";
import CredentialsModel from "../../../Models/CredentialsModel";

interface LoginProps {
  onSetUser: Function;
}
function Login({onSetUser}: LoginProps):JSX.Element {

  const [error,setError] = useState(null);
  const { register, handleSubmit,formState ,reset} = useForm<CredentialsModel>();
  const navigate = useNavigate();

  useEffect(() => {
    reset();
  },[]);

  async function  submit(credentials: CredentialsModel) {
    try {
      setError(null);
      const response = await axios.post<CredentialsModel>(`${config.urls.login}`,credentials)
      const token = response.data;
      console.log(token);
      if(token) navigate("/home");
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