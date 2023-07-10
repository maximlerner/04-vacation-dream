import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaTrash, FaEdit} from "react-icons/fa";
import classes from "./Card.module.css";
import VacationModel from "../../../Models/VacationModel";
import config from "../../../Utils/Config";
import VacationService from "../../../Services/VacationService";
import vacationsStore from "../../../Redux/Store";

interface CardProps {
  vacation: VacationModel;
  userType: string;
  setDeleting: Function;
  onSetCurrentPage: Function;
  setVacations: Function;
}

function Card({vacation,userType,setDeleting,onSetCurrentPage,setVacations}: CardProps): JSX.Element {
  const newFormatStart = new Date(vacation.dateStart).toLocaleDateString();
  const newFormatEnd = new Date(vacation.dateStart).toLocaleDateString();

  const [activeSubscribe, setActiveSubscribe] = useState(false);
  const navigate = useNavigate();

  console.log(vacationsStore.getState().vacations);

  function handleNavigateToUpdate(vacation: VacationModel) {
    console.log(vacation)
    const id = vacation.vacationID;
    navigate(`/editVacation/${id}`);
  }
  
  function handleDeleteVacation(id: number) {
    VacationService.deleteVacation(id,setDeleting,setVacations);
    onSetCurrentPage(1);
  }

  return (
    <div className={classes.card}>
      {/* Here we get the image from the rest API */}
      <img
        className={classes.cardImage}
        src={`${config.urls.vacationImages}${vacation.imageName}`}
      />
      <h2 className={classes.cardTitle}>{vacation.destination}</h2>
      <p className={classes.cardDescription}>{vacation.description}</p>
      <div className={classes.dates}>
        <p>Start at :{newFormatStart}</p>
        <p>End at :{newFormatEnd}</p>
      </div>
      <div className={classes.cardFooter}>
        {userType === "Admin" && (
          <div className={classes.actionDelete}>
            <FaTrash
              className={classes.delete}
              onClick={() =>
                handleDeleteVacation(Number(vacation.vacationID))
              }
            />
          </div>
        )}

        <p className={classes.price}>Price : ${vacation.price}</p>

        {userType === "User" && (
          <div className={activeSubscribe ? classes.actionsUser : ""}>
            <FaBookmark
              className={
                activeSubscribe
                  ? `${classes.subscribe} ${classes.subscribeActive}`
                  : `${classes.subscribe}`
              }
              onClick={() => setActiveSubscribe(!activeSubscribe)}
            />
          </div>
        )}

        {userType === "Admin" && (
          <div className={classes.actionEdit}>
            <FaEdit
              className={classes.edit}
              onClick={() => handleNavigateToUpdate(vacation)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
