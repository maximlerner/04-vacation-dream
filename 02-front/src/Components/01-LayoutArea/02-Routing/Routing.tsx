import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import VacationsList from "../../03-VacationsArea/02-VacationListArea/VacationList";
import VacationForm from "../../04-VacationFormsArea/01-VacationForm/VacationForm";
import Register from "../../05-AuthenticationArea/06-RegisterArea/Register";
import Login from "../../05-AuthenticationArea/08-LoginArea/Login";
import Statistics from "../../06-StatisticsArea/Statistics";
import LogOut from "../../05-AuthenticationArea/LogOut/LogOut";
import About from "../../07-AboutArea/About";
import Page404 from "../../08-RoutNotFoundArea/Page404";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/UserSlice";
import NotAuthorized from "../../09-NotAuthorizedArea/NotAuthorized";

function Routing(): JSX.Element {

  const user = useSelector(selectUser);
  const [role,setRole] = useState("");

  useEffect(() => {
      setRole(user.user[0]?.role);
  },[user])
  return (
    <>
      <Routes>
        {/* First 2 routes are for the vacations list */}
        <Route path="/" element={<VacationsList/>}/>

        <Route path="/home" element={<VacationsList/>}/>

        {/* That route is for adding new vacation(only admin authorized) */}
        <Route path="/addVacation" element={role === "2" ? (<VacationForm />) : (<Navigate replace to={"/unAuthorized"} />)}/>

        {/* That route is for aditing vacation(only admin authorized) */}
        <Route path="/editVacation/:id" element={role === "2" ? (<VacationForm />): (<Navigate replace to={"/unAuthorized"} />)}/>

        {/* That route is for signup */}
        <Route path="/register" element={!role ? (<Register />):(<Navigate replace to={"/home"} />)} />
        {/* That route is for login */}
        <Route path="/Login" element={!role ? (<Login />):(<Navigate replace to={"/home"} />)} />

        {/* That route is for statistics */}
        <Route path="/statistics" element={<Statistics />}/>

        {/* That route is for logout */}
        <Route path="/logout" element={role ? (<LogOut />):(<Navigate replace to={"/home"} />)} />

        {/* That route is for about the site info */}
        <Route path="/about" element={<About />} />
        
        {/* 404 route */}
        <Route path="/pageNotFound" element={<Page404 />} />

        {/* UnAuthorized */}
        <Route path="/unAuthorized" element={<NotAuthorized />} />

        {/* If user try route that doesn't exists he will be redirected to pageNotFound route */}
        <Route path="*" element={<Navigate to="/pageNotFound" />} />
      </Routes>
    </>
  );
}

export default Routing;
