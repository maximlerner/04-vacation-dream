import { useEffect, useState } from "react";
import classes from "./Nav.module.css"
import {NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/UserSlice";

interface NavProps {
    onSetActive?: Function;
    active?: boolean;
}

function Nav({onSetActive,active}: NavProps):JSX.Element {

    const user = useSelector(selectUser);
    const [role,setRole] = useState("");

    useEffect(() => {
        setRole(user.user[0]?.role);
    },[user])

    function handleClick() {
        if(onSetActive) {
            onSetActive(!active);
            console.log(active);
        }
    }
  
    return (
    <nav className={classes.nav}>
        <div className={classes.linksList}>

            {/* Link to home page */}
            <NavLink 
                onClick={handleClick} 
                className={({isActive}) => (isActive ? `${classes.link} ${classes.active}` : classes.link)} 
                to="/home" >Home
            </NavLink>

            {/* Link to Add-Vacation page */}
            {role === '2' && <NavLink 
                onClick={handleClick} 
                className={({isActive}) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
                to="/addVacation" >Add-Vacation
            </NavLink>}

            {/* Link to Register page */}
            {!role &&<NavLink 
                onClick={handleClick} 
                className={({isActive}) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
                to="/register" >Register
            </NavLink>}

            {/* Link to Login page */}
            {!role && <NavLink 
                onClick={handleClick} 
                className={({isActive}) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
                to="/login" >Login
            </NavLink>}

            {/* Link to Statistics page */}
            <NavLink 
                className={({isActive}) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
                onClick={handleClick} 
                to="/Statistics" >Statistics
            </NavLink>

            {/* Link to About page */}
            <NavLink 
                className={({isActive}) => (isActive ? `${classes.link} ${classes.active}` : classes.link)} 
                onClick={handleClick} 
                to="/about" >About
            </NavLink>

            {/* Link to Logout page */}
            {role && <NavLink 
                onClick={handleClick} 
                className={({isActive}) => (isActive ? `${classes.link} ${classes.active}` : classes.link)} 
                to="/logout" >Logout
            </NavLink>}
        </div>
    </nav>)
}

export default Nav;