import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import React from "react";

function Logout() {

    const auth = useAuth();
    const navigate = useNavigate();
    
    localStorage.removeItem("isLogged");
    localStorage.removeItem("role");
    auth.logout()
    window.location.reload();
    navigate("/login",{replace: true})

    return
}

export default Logout;
