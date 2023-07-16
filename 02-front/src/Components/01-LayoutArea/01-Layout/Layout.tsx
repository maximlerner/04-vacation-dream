import { useEffect, useState } from "react";

import classes from "./Layout.module.css";
import Header from "../../02-headerArea/01-Header/Header";
import Routing from "../02-Routing/Routing";
import Footer from "../03-Footer/Footer";

function Layout(): JSX.Element {

  return (
    <div className={classes.layout}>
      <Header />
      <main>
        <Routing />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
