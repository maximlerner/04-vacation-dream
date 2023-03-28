import React, { useState } from "react";
import './App.css';
import { Navigate,Routes,Route } from 'react-router-dom';
import Statistics from './Components/Statistics';
import NoMatch from './Components/NoMatch';
import { AuthProvider} from './Components/Auth';
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import AdminController from "./Components/AdminController";
import NewVacation from "./Components/NewVacation";
import Vacations from "./Components/Vacations";
import NotAuthorized from './Components/NotAuthorized';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Logout from "./Components/Logout";


const storageIsLoggedValue = localStorage.getItem("isLogged");
const storageRoleValue = localStorage.getItem("role");

function App() {
  return (
    <AuthProvider>
      <div className="App">
      <Header />
      <main>
      <Routes>
        <Route path="/" element={(storageIsLoggedValue == null)? <Login/>: <Navigate to="/statistics"/>} />
        
        <Route path="/home" element={(storageIsLoggedValue == 'true' && storageRoleValue == 'user')? <Home/>: <Navigate to="/notAuthorized"/>} />

        <Route path="/register" element={(storageIsLoggedValue == null)? <Register/>: <Navigate to="/home"/>} />
        <Route path="/login" element={(storageIsLoggedValue == null)? <Login/>: <Navigate to="/home"/>} />

        <Route path="/AdminController" element={(storageIsLoggedValue == 'true' && storageRoleValue == 'admin')? <AdminController/>: <Navigate to="/notAuthorized"/>}/>

        <Route path="/newVacation" element={(storageIsLoggedValue == 'true' && storageRoleValue == 'admin')? <NewVacation/>: <Navigate to="/notAuthorized"/>} />

        <Route path="/Statistics" element={storageIsLoggedValue ? <Statistics /> :<Navigate to="/notAuthorized" />}/>

        <Route path="/Vacations" element={(storageIsLoggedValue == 'true' && storageRoleValue == 'admin')? <Vacations/>: <Navigate to="/notAuthorized"/>} /> 

        <Route path="/logout" element={(storageIsLoggedValue == 'true')? <Logout/>: <Navigate to="/statistics"/>} /> 
       
        <Route path="/notAuthorized" element={<NotAuthorized />} /> 
        <Route path='*' element={<NoMatch />} />
      </Routes>
      </main>
      <Footer />
      </div>
    </AuthProvider>
  )
}

export default App;
