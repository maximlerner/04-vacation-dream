import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

import UserModel from "../../../Models/UserModel";
import classes from "./Register.module.css";
import config from "../../../Utils/Config";

function Register():JSX.Element {
  const [error,setError] = useState(null);
  const { register, handleSubmit,formState ,reset} = useForm<UserModel>();

  useEffect(() => {
    reset();
  },[]);

  async function  submit(user: UserModel) {
    try {
      setError(null);
      const response = await axios.post<UserModel>(`${config.urls.register}`,user)
      const addedUser = response.data;
      console.log(addedUser);
      reset();
    } 
    catch(err:any) {
      setError(err.response.data);
    }
  }

    return (
    <section>
      <h2 className={classes.registerTitle}>Register</h2>

      <form className={classes.register} onSubmit={handleSubmit(submit)}>
        <label>
          <span>First Name:</span>
            <input
              placeholder="First Name"
              {...register("firstName",{
                required : {value: true , message: "First Name is required"},
                minLength: {value: 2,message: "First name must be minimum 3 chars"},
                maxLength: {value: 50,message: "First name must be minimum 3 chars"}
              })}
              />
            <span 
              className={formState.errors.firstName?.message ? `${classes.errorMessage} ${classes.error}` : classes.errorMessage}>
              {formState.errors.firstName?.message ? formState.errors.firstName?.message: "error"}
            </span>
        </label>

        <label>
          <span>last Name:</span>
            <input
              placeholder="Last Name"
              {...register("lastName",{
                required : {value: true , message: "Last Name is required"},
                minLength: {value: 2,message: "Last name must be minimum 3 chars"},
                maxLength: {value: 50,message: "Last name must be minimum 3 chars"}
              })}
            />
           <span 
           className={formState.errors.lastName?.message ? `${classes.errorMessage} ${classes.error}` : classes.errorMessage}>
            {formState.errors.lastName?.message ? formState.errors.lastName?.message: "error"}
           </span>
        </label>

        <label>
          <span>User Name:</span>
            <input
              autoComplete="off"
              placeholder="User Name"
              {...register("userName",{
                required : {value: true , message: "User Name is required"},
                minLength: {value: 2,message: "User name must be minimum 3 chars"},
                maxLength: {value: 50,message: "User name must be minimum 3 chars"}
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
              type="text"
              autoComplete="off"
              placeholder="Password"
              {...register("password",{
                required : {value: true , message: "Password is required"},
                minLength: {value: 2,message: "Password must be minimum 3 chars"},
                maxLength: {value: 50,message: "Password must be minimum 3 chars"}
              })}
            />
            <span 
              className={formState.errors.password?.message ? `${classes.errorMessage} ${classes.error}` : classes.errorMessage}>
                {formState.errors.password?.message ? formState.errors.password?.message: "error"}
            </span>
        </label>

        <button className={classes.btn} type="submit">Register</button>
        <span 
          className={error ? `${classes.errorMessage} ${classes.error}` : classes.errorMessage}>
          {error? error : "error"}
        </span>
      </form>
    </section>)
}

export default Register;



