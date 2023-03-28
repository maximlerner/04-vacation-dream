import { NavLink } from "react-router-dom";
import { useAuth } from "./Auth";
import './NavBar.css';
 
function NavBar() {

    const auth = useAuth()
    return (
        <div className='navBar'>
            {(auth.isLogged && auth.role == 'user') && <NavLink className="" to='/Home'>Home</NavLink>}
            {(auth.isLogged && auth.role == 'admin') &&<NavLink to='/adminController'>Admin View</NavLink>}
            {(auth.isLogged && auth.role == 'admin') &&<NavLink to='/newVacation'>New Vacation</NavLink>}
            {auth.isLogged && <NavLink to='/statistics'>Statistics</NavLink>}
            {!auth.isLogged && <NavLink className="box" to='/register'>Register</NavLink>}
            {!auth.isLogged && <NavLink className="box" to='/Login'>Login</NavLink>}
            {auth.isLogged && <NavLink to='/logout'>Logout</NavLink>}
        </div>
    )
}

export default NavBar;