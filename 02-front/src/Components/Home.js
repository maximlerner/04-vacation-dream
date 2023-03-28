import { useState, useEffect,useRef } from "react";
import { HiThumbUp } from "react-icons/hi";
import Axios from "axios";
import classes from "./Home.module.css";

function Home() {
  const [vacation_list, setVacationList] = useState([]);
  const [vacation_list1, setVacationList1] = useState('');
  const refFollow = useRef(null);

  useEffect(() => {
    Axios.get("http://localhost:3030").then((response) => {
      setVacationList(response.data);
    });
  }, []);

  const handleClick = event => {
    console.log('className 👉️', event.currentTarget.className);

    let followActive;
    let statisticsUpdate;

    let store;

    // 👇️ check if element contains class
    if (event.currentTarget.classList.contains(`${classes.like_active_off}`)) {
      event.currentTarget.classList.toggle(`${classes.like_active_off}`);
      event.currentTarget.classList.toggle(`${classes.like_active_on}`);
      statisticsUpdate = 1;
      followActive = true;
      console.log(followActive)
    } else {
      event.currentTarget.classList.toggle(`${classes.like_active_off}`);
      event.currentTarget.classList.toggle(`${classes.like_active_on}`);
      followActive = false;
      statisticsUpdate = -1;
      console.log(followActive)
    }
    store = event.currentTarget;
    console.log(event.currentTarget.id);
    console.log(event.currentTarget.value);
      Axios.put("http://localhost:3030/updateStatistics",{
        vacationID: event.currentTarget.id,
        followersCount: event.currentTarget.value,
        followUpdate: statisticsUpdate
      }).then((response) => {
        setVacationList1(response.data);
      });
  };

  return (
    //this is the component registered users will see but not admins
    <div className={classes.home}>
      {vacation_list.map((val) => {
        let newDateStart = new Date(val.dateStart);
        let newDateEnd = new Date(val.dateEnd);
        return (
          <div className={`${classes.card} ${classes.box}`} key={val.vacationID}>
            <button ref={refFollow} id={val.vacationID} value={val.followers} className={classes.like_active_off} onClick={handleClick}><HiThumbUp/></button>
            {/* <h3 ref={refID} hidden>{val.vacationID}</h3> */}
            <h3>Destination: {val.destination}</h3>
            <h3>description: {val.description}</h3>
            <h3>
              From: {newDateStart.getMonth() + 1}/{newDateStart.getDate()}/
              {newDateStart.getFullYear()}
            </h3>
            <h3>
              To: {newDateEnd.getMonth() + 1}/{newDateEnd.getDate()}/
              {newDateEnd.getFullYear()}
            </h3>
            <h3>Price: €{val.price}</h3>
            <h3>Followers: {val.followers}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
