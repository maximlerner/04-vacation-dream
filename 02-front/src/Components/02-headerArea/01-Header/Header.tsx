import { useState } from "react";
import { FaBars } from "react-icons/fa";

import classes from "./Header.module.css";
import Nav from "../02-Nav/Nav";

interface HeaderProps {
    user: any;
}

function Header({user}: HeaderProps):JSX.Element {
    const [active,setActive] = useState<boolean>(false);

    return <div className={classes.header}>

        <h1 className={classes.mainTitle}>Vacation Dream</h1>
        {window.innerWidth  >= 575  &&  <Nav user={user}  />}
        {active  && <Nav active={active} onSetActive={setActive} user={user} />}
        <FaBars onClick={() => setActive(!active)} className={classes.dropMenuBtn} />
        <p className={classes.userTitle}>Welcome {user?.userName ? user.userName: 'Guest'}</p>
    </div>
}

export default Header;
