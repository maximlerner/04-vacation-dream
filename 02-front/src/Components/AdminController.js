import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import classes from  "./AdminController.module.css";

function AdminController() {
  const [_newDescription, setNewDescription] = useState("");
  const [_newDestination, setNewDestination] = useState("");
  const [_newImage, setNewImage] = useState("");
  const [_newDateStart, setNewDateStart] = useState("");
  const [_newDateEnd, setNewDateEnd] = useState("");
  const [_newPrice, setNewPrice] = useState("");
  const [_newFollowers, setNewFollowers] = useState("");

  const [vacation_list, setVacationList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3030").then((response) => {
      setVacationList(response.data);
    });
  }, [vacation_list,setVacationList]);

  const deleteVacation = (vacationID) => {
    Axios.delete(`http://localhost:3030/deleteVacation/${vacationID}`);
  }

  const updateVacation = (vacationID) => {
    Axios.put(`http://localhost:3030/updateVacation/${vacationID}`, {
      description: _newDescription,
      destination: _newDestination,
      dateStart: _newDateStart,
      dateEnd: _newDateEnd,
      image: _newImage,
      price: _newPrice,
      followers: _newFollowers,
    });
    setNewDescription("");
    setNewDestination("");
    setNewDateStart("");
    setNewDateEnd("");
    setNewImage("");
    setNewPrice("");
    setNewFollowers("");
  }
  return (
    //this is the component admin will see but not users
    <div className={classes.AdminController}>
      <h1>Admin</h1>
      {vacation_list.map((val) => {
        let newDateStart = new Date(val.dateStart);
        let newDateEnd = new Date(val.dateEnd);
        return (
          <div className={`${classes.card} ${classes.box}`} key={val.vacationID}>
            <h3>Image: {val.image}</h3>
            <input type="text" onChange={(e) => {
              setNewImage(e.target.value);
            }} />
            <h3>Destination: {val.destination}</h3>
            <input type="text" onChange={(e) => {
              setNewDestination(e.target.value);
            }} />
            <h3>description: {val.description}</h3>
            <input type="text" onChange={(e) => {
              setNewDescription(e.target.value);
            }} />
            <h3>
              From: {newDateStart.getMonth() + 1}/{newDateStart.getDate()}/
              {newDateStart.getFullYear()}
            </h3>
            <input type="date" onChange={(e) => {
              setNewDateStart(e.target.value);
            }} />
            <h3>
              To: {newDateEnd.getMonth() + 1}/{newDateEnd.getDate()}/
              {newDateEnd.getFullYear()}
            </h3>
            <input type="date" onChange={(e) => {
              setNewDateEnd(e.target.value);
            }} />
            <h3>Price: €{val.price}</h3>
            <input type="number" onChange={(e) => {
              setNewPrice(e.target.value);
            }} />
            <h3>Folowers: {val.followers}</h3>
            <input type="number" onChange={(e) => {
              setNewFollowers(e.target.value);
            }} />
            <div className="btn-wrap">
            <button className={`${classes.box} ${classes.btn}`} onClick={() =>{deleteVacation(val.vacationID)}}>Delete</button>
            <button className={`${classes.box} ${classes.btn}`} 
            onClick={() =>{updateVacation(
              val.vacationID,
              val.description,
              val.destination,
              val.newDateStart,
              val.newDateEnd,
              val.image,
              val.price,
              val.followers
              )}}>Edit</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminController;