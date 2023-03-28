import { useState,createContext,useContext, useEffect } from "react";
import {useNavigate } from "react-router-dom";

import React from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const [userName, setUserName] = useState(null);
    const [isLogged, setIsLogged] = useState(null);
    const [role, setRole] = useState(null);

    const navigate = useNavigate();

    useEffect(()=> {
        const newIsLogged = localStorage.getItem("isLogged");
        const newRole = localStorage.getItem("role");
        setIsLogged(newIsLogged);
        setRole(newRole)
    },[setIsLogged,setRole])

    console.log(isLogged,role)



    const login = (userName,role) => {
        localStorage.setItem("isLogged",true);
        localStorage.setItem("role",role);
        setUserName(userName);
        setIsLogged(true);
        setRole(role);
        navigate("/statistics",{replace: true})
        console.log(userName,role)
        if (localStorage.getItem("isLogged") == 'true') {
            console.log("User is logged")
        } else {
            console.log("User isn't logged")
        }
    }

    const logout = () => {
        localStorage.removeItem("isLogged");
        localStorage.removeItem("role");
        setUserName(null);
        setIsLogged(null);
        setRole(null);
        window.location.reload()
        navigate("/login",{replace: true})
    }
    return (
        <AuthContext.Provider
         value={{userName,isLogged,role,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}