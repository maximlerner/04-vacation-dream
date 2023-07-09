import classes from "./Nav.module.css"
import {NavLink} from "react-router-dom";

interface NavProps {
    user: {
        role: string;
    }
    onSetActive?: Function;
    active?: boolean;
}

function Nav({user,onSetActive,active}: NavProps):JSX.Element {

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
            {user?.role === 'Admin' && <NavLink 
                onClick={handleClick} 
                className={({isActive}) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
                to="/addVacation" >Add-Vacation
            </NavLink>}

            {/* Link to Register page */}
            {!user?.role &&<NavLink 
                onClick={handleClick} 
                className={({isActive}) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
                to="/register" >Register
            </NavLink>}

            {/* Link to Login page */}
            {!user?.role && <NavLink 
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
            {user?.role && <NavLink 
                onClick={handleClick} 
                className={({isActive}) => (isActive ? `${classes.link} ${classes.active}` : classes.link)} 
                to="/logout" >Logout
            </NavLink>}
        </div>
    </nav>)
}

export default Nav;