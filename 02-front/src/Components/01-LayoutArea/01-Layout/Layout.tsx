import { useState, useEffect } from "react";

import classes from "./Layout.module.css";
import Header from "../../02-headerArea/01-Header/Header";
import Routing from "../02-Routing/Routing";
import Footer from "../03-Footer/Footer";

//////////////////////////////////////////////////
// Test data
const adminTest = {
  userName: "Max",
  role: "Admin",
};

const userTest = {
  userName: "Anna",
  role: "User",
};
//////////////////////////////////////////////////

function Layout(): JSX.Element {

  const [user, setUser] = useState<any>(adminTest);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (user) {
      setUserType(user.role);
    } 
  }, []);


  return (
    <div className={classes.layout}>
      <Header user={user} />
      <main>
        <Routing onSetUser={setUser} userType={userType}/>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
