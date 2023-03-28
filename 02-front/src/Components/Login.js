import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import Axios from "axios";
import classes from "./Login.module.css";



function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(()=> {
  },[])


  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("role");
    localStorage.removeItem("isLogged");
    Axios.post(`http://localhost:3030/login`, {
        userName: userName,
        password: password,
    }).then((response) => {
        if(response.data.message) {
            // setLoginStatus(response.data.message)
            console.log(`No user:${response.data} have been found`)
        } else {
            // setLoginStatus(response.data[0].userName);
            console.log(`user name : ${response.data.userInfo.userName} ${response.data.userInfo.userRole} have been found`);
            const role = response.data.userInfo.userRole;
            const newUserName = response.data.userInfo.userRole;
            setUserName(newUserName)
            auth.login(userName,role);
            window.location.reload();
            navigate("/statistics",{replace: true})
        }
        
    });
    setUserName('');
    setPassword('');
  };
  return (
    <>
      <h1>Login</h1>
      <form className={classes.login} onSubmit={handleSubmit}>
        <label>
          <span>User Name:</span>
          <input
          value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </label>

        <label>
          <span>Password:</span>
          <input
          type="password"
          value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        <button className={classes.box} type="submit">Login</button>
      </form>
      {/* <h2>{thanks}</h2> */}
    </>
  )
}

export default Login;