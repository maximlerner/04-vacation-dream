import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import classes from "./Header.module.css";
import Nav from "../02-Nav/Nav";
import { login, selectUser } from "../../../Redux/UserSlice";

function Header():JSX.Element {
    const [active,setActive] = useState<boolean>(false);
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const [userName,setUserName] = useState("");

    useEffect(() => {
        // If token exist then update the user before setting the user name 
        if(localStorage.getItem("token")) {
            dispatch(login(localStorage.getItem("token")));
        }
        setUserName(user.user[0]?.userName);
    },[user])
 
    return <div className={classes.header}>

        <h1 className={classes.mainTitle}>Vacation Dream</h1>
        {window.innerWidth  >= 575  &&  <Nav />}
        {active  && <Nav active={active} onSetActive={setActive} />}
        <FaBars onClick={() => setActive(!active)} className={classes.dropMenuBtn} />
        <p className={classes.userTitle}>Welcome {userName}</p>
    </div>
}

export default Header;
