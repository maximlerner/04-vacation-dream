import { Routes, Route, Navigate } from "react-router-dom";

import VacationModel from "../../../Models/VacationModel";
import VacationsList from "../../03-VacationsArea/02-VacationListArea/VacationList";
import VacationForm from "../../04-VacationFormsArea/01-VacationForm/VacationForm";
import Register from "../../05-AuthenticationArea/06-RegisterArea/Register";
import Login from "../../05-AuthenticationArea/08-LoginArea/Login";
import Statistics from "../../06-StatisticsArea/Statistics";
import LogOut from "../../05-AuthenticationArea/LogOut/LogOut";
import About from "../../07-AboutArea/About";
import Page404 from "../../08-RoutNotFoundArea/Page404";

interface RoutingProps {
  vacations: VacationModel[];
  onSetVacationList: Function;
  filteredVacations: VacationModel[];
  vacationToUpdate: Object;
  onUpdateVacation: any;
  onSetUser: Function;
  userType: string;
  filtered: boolean;
  onFilter: Function;
  onFilterVacations: Function;
  error: string;

}

function Routing(
  {vacations,onSetVacationList,filteredVacations,vacationToUpdate,onUpdateVacation,
    onSetUser,userType,filtered,onFilter,onFilterVacations,error
  }:RoutingProps): JSX.Element {
  return (
    <>
      <Routes>
        {/* First 2 routes are for the vacations list */}
        <Route
          path="/"
          element={
            <VacationsList
              onSetVacationList={onSetVacationList}
              userType={userType}
              onUpdateVacation={onUpdateVacation}
              filtered={filtered}
              onFilter={onFilter}
              cards={vacations}
              filteredVacations={filteredVacations}
              onFilterVacations={onFilterVacations}
              error={error}
            />
          }
        />

        <Route
          path="/home"
          element={
            <VacationsList
              onSetVacationList={onSetVacationList}
              userType={userType}
              onUpdateVacation={onUpdateVacation}
              filtered={filtered}
              onFilter={onFilter}
              cards={vacations}
              filteredVacations={filteredVacations}
              onFilterVacations={onFilterVacations}
              error={error}
            />
          }
        />

        {/* That route is for adding new vacation(only admin authorized) */}
        <Route
          path="/addVacation"
          element={
            <VacationForm setVacationsList={onSetVacationList} />
          }
        />

        {/* That route is for aditing vacation(only admin authorized) */}
        <Route
          path="/editVacation/:id"
          element={
            <VacationForm setVacationsList={onSetVacationList} vacationToUpdate={vacationToUpdate}/>
          }
        />

        {/* That route is for signup */}
        <Route path="/register" element={<Register />} />
        {/* That route is for login */}
        <Route path="/Login" element={<Login onSetUser={onSetUser} />} />

        {/* That route is for statistics */}
        <Route
          path="/statistics"
          element={<Statistics vacations={vacations} />}
        />

        {/* That route is for logout */}
        <Route path="/logout" element={<LogOut />} />

        {/* That route is for about the site info */}
        <Route path="/about" element={<About />} />
        
        {/* 404 route */}
        <Route path="/pageNotFound" element={<Page404 />} />
        {/* If user try route that doesn't exists he will be redirected to pageNotFound route */}
        <Route path="*" element={<Navigate to="/pageNotFound" />} />
      </Routes>
    </>
  );
}

export default Routing;
