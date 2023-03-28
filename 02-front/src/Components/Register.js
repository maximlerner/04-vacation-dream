import React from "react";
import { useForm } from "react-hook-form";
import { useRef ,useState} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import * as yup from "yup";
import classes from "./Register.module.css";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  userName: yup.string().required("User name is required"),
  password: yup.string().required("Password name is required"),
});

function Register() {
  const userNameRef = useRef();
  const [thanks, setThanks] = useState("");

  const [first_Name, setFirstName] = useState("");
  const [last_Name, setLastName] = useState("");
  const [user_Name, setUserName] = useState("");
  const [_password, setPassword] = useState("");

  const {register,formState: { errors },handleSubmit,} = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data.userName);
    let users = []
    setUserName(user_Name)
    Axios.get("http://localhost:3030/getUsers").then((response) => {
      users = response.data
      console.log(users)
      console.log(`response.data: ${response.data}`)
      const axistingUserNamesRegistered = users.filter(
        (axistingUserName => axistingUserName.userName == data.userName)
      ) 
      if (axistingUserNamesRegistered.length > 0) {
        alert('That user name already in use ');
      }else {
        alert('That user name is available');
        Axios
          .post(`http://localhost:3030/register`, {
            firstName: first_Name,
            lastName: last_Name,
            userName: user_Name,
            password: _password,
          })
          .then(() => {
            alert("ok");
            setThanks("Thank you");
          });
      }
    });
  };

  return (
    <>
      <h1>Register</h1>
      <form className={classes.register} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>First Name:</span>
          <input
            value={first_Name}
            placeholder="First Name"
            {...register("firstName")}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <span>{errors.firstName?.message}</span>
        </label>

        <label>
          <span>last Name:</span>
          <input
            value={last_Name}
            placeholder="Last Name"
            {...register("lastName")}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <span>{errors.lastName?.message}</span>
        </label>

        <label>
          <span>User Name:</span>
          <input
            value={user_Name}
            ref={userNameRef}
            autoComplete="off"
            placeholder="User Name"
            {...register("userName")}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <span>{errors.userName?.message}</span>
        </label>

        <label>
          <span>Password:</span>
          <input
            type="text"
            value={_password}
            autoComplete="off"
            placeholder="Password"
            {...register("password")}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>{errors.password?.message}</span>
        </label>

        <button className={classes.box} type="submit">Register</button>
      </form>
      <h2>{thanks}</h2>
    </>
  );
}

export default Register;