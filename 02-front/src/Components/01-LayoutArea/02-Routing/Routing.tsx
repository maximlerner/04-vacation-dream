import { Routes, Route, Navigate } from "react-router-dom";

import VacationsList from "../../03-VacationsArea/02-VacationListArea/VacationList";
import VacationForm from "../../04-VacationFormsArea/01-VacationForm/VacationForm";
import Register from "../../05-AuthenticationArea/06-RegisterArea/Register";
import Login from "../../05-AuthenticationArea/08-LoginArea/Login";
import Statistics from "../../06-StatisticsArea/Statistics";
import LogOut from "../../05-AuthenticationArea/LogOut/LogOut";
import About from "../../07-AboutArea/About";
import Page404 from "../../08-RoutNotFoundArea/Page404";

interface RoutingProps {
  onSetUser: Function;
  userType: string;
}

function Routing(
  {onSetUser,userType}:RoutingProps): JSX.Element {
  return (
    <>
      <Routes>
        {/* First 2 routes are for the vacations list */}
        <Route
          path="/"
          element={
            <VacationsList
              userType={userType}
            />
          }
        />

        <Route
          path="/home"
          element={
            <VacationsList
              userType={userType}
            />
          }
        />

        {/* That route is for adding new vacation(only admin authorized) */}
        <Route
          path="/addVacation"
          element={
            <VacationForm  />
          }
        />

        {/* That route is for aditing vacation(only admin authorized) */}
        <Route
          path="/editVacation/:id"
          element={
            <VacationForm />
          }
        />

        {/* That route is for signup */}
        <Route path="/register" element={<Register />} />
        {/* That route is for login */}
        <Route path="/Login" element={<Login onSetUser={onSetUser} />} />

        {/* That route is for statistics */}
        <Route
          path="/statistics"
          element={<Statistics />}
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
