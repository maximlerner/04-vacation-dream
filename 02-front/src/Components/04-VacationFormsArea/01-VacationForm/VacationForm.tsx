import React, { useState, useEffect } from "react";
import { useForm,Controller  } from "react-hook-form";
import { useNavigate,useParams } from "react-router-dom";

import classes from "./VacationForm.module.css";
import VacationModel from "../../../Models/VacationModel";
import CustomDateInput from "../02-DateInput/CustomDateInput";
import vacationService from "../../../Services/VacationService";

interface VacationFormProps {
  vacationToUpdate?: any;
  setVacationsList?: any;
}

function VacationForm({vacationToUpdate,setVacationsList}: VacationFormProps): JSX.Element {

  //Initial values depends on the route
  const initialDescription = vacationToUpdate && vacationToUpdate.description || "";
  const initialDestination = vacationToUpdate && vacationToUpdate.destination || "";
  const initialStartDate = vacationToUpdate && vacationToUpdate.dateStart || new Date;
  const initialEndDate = vacationToUpdate && vacationToUpdate.dateEnd || new Date;
  const initialPrice = vacationToUpdate && vacationToUpdate.price || null;

  // States
  const [dateStart, setDateStart] = useState(initialStartDate);
  const [dateEnd, setDateEnd] = useState(initialEndDate);
  const [newVacation, setNewVacation] = useState(true);
  const { register, handleSubmit,formState,control} = useForm<VacationModel>();
  const [error,setError] = useState("error");
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    // The form will display the edit button only if vacation object exists if not considered as new vacation
    if (vacationToUpdate?.vacationID) setNewVacation(false);
  }, []);

  async function submit(vacation: VacationModel) {
    try {
      const vacationsWithDates: VacationModel = {...vacation,imageName: ""};
      vacationsWithDates.dateStart = new Date(vacation.dateStart);
      vacationsWithDates.dateEnd = new Date(vacation.dateEnd);

      if(vacationToUpdate && id) {
        vacationsWithDates.followers = vacationToUpdate.followers;
        vacationsWithDates.imageName = vacationToUpdate.imageName;
        await vacationService.updateVacation(+id,vacationsWithDates);
      }
      if(!vacationToUpdate) {
        await vacationService.createVacation(vacationsWithDates);
      }
      vacationService.getAllVacations(setVacationsList);
      navigate("/home")
    } 
    catch(err:any) {
      if(err) setError(err.response?.data);
    }
  }

  return (
    <section className={classes.vacationAddOrEdit}>
      {/* The title will change accordingly depends if there is any vacation to update  */}
      <h2 className={classes.newVacationTitle}>
        {newVacation ? "New Vacation" : "Edit Vacation"}
      </h2>

      {/* Vacation form */}
      <form className={classes.vacationForm} onSubmit={handleSubmit(submit)}>

        {/* Destination  */}
        <label className={classes.fullRow}>
          <span>Destination:</span>
          <input
            placeholder="Destination" className={classes.inputClass}
            {...register("destination",{
              required : {value:true,message :"Destination is required"},
              maxLength:{value : 100,message:"Destination must be minimum 3 chars"},
              minLength:{value : 2,message:"Destination name must be minimum 3 chars"}
            })}
            defaultValue={initialDestination}
          />
          <span 
            className={formState.errors.destination?.message ?`${classes.errorMessage} ${classes.error}` : classes.errorMessage}>
            {formState.errors.destination ? formState.errors.destination?.message : "error"}
          </span>
        </label>

        {/* Description  */}
        <label className={classes.fullRow}>
          <span>Description:</span>
          <input
            placeholder="Description" className={classes.inputClass} defaultValue={initialDescription}
            {...register("description",{
              required: {value:true,message :"Description is required"},
              maxLength:{value : 100,message:"Description must be minimum 3 chars"},
              minLength:{value : 2,message:"Description name must be minimum 3 chars"}
            })}
          />
          <span 
            className={formState.errors.description?.message ?`${classes.errorMessage} ${classes.error}` : classes.errorMessage}>
            {formState.errors.description ? formState.errors.description?.message : "error"}
          </span>
        </label>

        {/* Image */}
        <label>
          <span>Image:</span>
          <input
            className={classes.uploadBox} type="file" accept="images/*"
            {...register("image",{
              required: {value:true,message :"Image is required"}
            })}
          />
          <span 
            className={formState.errors.image?.message ?`${classes.errorMessage} ${classes.error}` : classes.errorMessage}>
            {formState.errors.image ? formState.errors.image?.message : "error"}
          </span>
        </label>

        {/* Starting Date */}
        <label>
          <span>Starting Date:</span>
          <div className="calendar">
            {/* <CustomDateInput date={dateStart} onDateChange={setDateStart}/> */}
            <CustomDateInput name={"dateStart"} control={control} />
          </div>
          <span className={classes.noError}>Starting Date is required</span>
        </label>

        {/* Ending Date */}
        <label>
          <span>Ending Date:</span>
          <div className="calendar">
            {/* <CustomDateInput date={dateStart} onDateChange={setDateEnd}/>  */}
            <CustomDateInput name="dateEnd" control={control}  /> 
          </div>
          <span className={classes.noError}>Ending Date is required</span>
        </label>

        {/* Price */}
        <label>
          <span>Price:</span>
          <input
            placeholder="Price" type="number" className={classes.inputClass} defaultValue={initialPrice} step="0.01"
            {...register("price",{
              required: {value: true,message: "Price is required"},
              min:{value : 0,message:"Price can't be nagative"},
              max:{value : 100000,message:"Price can't be greater then $100,000"}
            })}
          />
          <span 
            className={formState.errors.price?.message ?`${classes.errorMessage} ${classes.error}` : classes.errorMessage}>
            {formState.errors.price ? formState.errors.price?.message : "error"}
            </span>
        </label>

        {/* Submit */}
          <button className={classes.btn} type="submit">
            {vacationToUpdate ? 'Edit vacation':'Add new vacation'}
          </button>
      </form>
    </section>
  );
}

export default VacationForm;








