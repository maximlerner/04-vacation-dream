import { useState, useEffect } from "react";
//test
import classes from "./Layout.module.css";
import VacationModel from "../../../Models/VacationModel";
import VacationService from "../../../Services/VacationService";
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


  const [vacationsList, setVacationsList] = useState<VacationModel[]>([]);
  const [fillteredVacations, setFilteredVacations] = useState([]);
  const [vacationToUpdate, setVacationToUpdate] = useState({});
  const [user, setUser] = useState<any>(adminTest);
  const [userType, setUserType] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [error,setError] = useState("");

  useEffect(() => {
    if (user) {
      setUserType(user.role);
    } 
    VacationService.getAllVacations(setVacationsList,setError);
  }, []);
  console.log(vacationsList);
  console.log(fillteredVacations);

  return (
    <div className={classes.layout}>
      <Header user={user} />
      <main>
        <Routing
          onSetVacationList={setVacationsList}
          onUpdateVacation={setVacationToUpdate}
          vacationToUpdate={vacationToUpdate}
          vacations={vacationsList}
          filteredVacations={fillteredVacations}
          // onFilterVacations sets new array of vacations and onFilter sets true or false to check if there is a filter
          onFilterVacations={setFilteredVacations}
          filtered={filtered}
          onFilter={setFiltered}
          onSetUser={setUser}
          userType={userType}
          error={error}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
