import React from "react";
import classes from "./Header.module.css";
import NavBar from "./NavBar";

function Header() {
  return (
      <div className={classes.Header}>
        <h1>Vacation Dream</h1>
        <NavBar />
      </div>
  );
}

export default Header;