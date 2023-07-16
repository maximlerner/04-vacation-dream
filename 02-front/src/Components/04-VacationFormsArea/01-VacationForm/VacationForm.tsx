import React, { useState, useEffect } from "react";
import { useForm,Controller  } from "react-hook-form";
import { useNavigate,useParams } from "react-router-dom";

import classes from "./VacationForm.module.css";
import VacationModel from "../../../Models/VacationModel";
import CustomDateInput from "../02-DateInput/CustomDateInput";
import vacationService from "../../../Services/VacationService";
import vacationsStore from "../../../Redux/Store";

const empty = {
  description: "",
  destination : "",
  dateStart : new Date,
  dateEnd : new Date,
  price : 0,
  followers: 0,
  imageName: ""
}

function VacationForm(): JSX.Element {

  // States
  const v = vacationsStore.getState().vacations;
  const { register, handleSubmit,formState,control} = useForm<VacationModel>();
  const [error,setError] = useState("error");
  const [newVacation,setNewVacation] = useState(true);
  const navigate = useNavigate();
  const {id} = useParams();

  const [vacationToUpdate,setVacationToUpdate] = useState(empty);

  useEffect(() => {
    if (id) {
      const vacation = vacationsStore.getState().vacations.find(
        (vacation) => vacation.vacationID === Number(id)
      );
      if (vacation) {
        setVacationToUpdate(vacation);
        setNewVacation(false);
      }
    }
  }, [id]);

  //Initial values depends on the route
  const initialDescription = id ? vacationToUpdate?.description : "";
  const initialDestination = id ? vacationToUpdate?.destination : "";
  const initialStartDate = id ? vacationToUpdate?.dateStart : new Date;
  const initialEndDate = id ? vacationToUpdate?.dateEnd : new Date;
  const initialPrice = id ? vacationToUpdate?.price : 0;

  async function submit(vacation: VacationModel) {
    try {
      vacation.imageName = "";
      vacation.dateStart = new Date(vacation.dateStart);
      vacation.dateEnd = new Date(vacation.dateEnd);

      if(id && vacationToUpdate) {
        vacation.followers = vacationToUpdate.followers;
        vacation.imageName = vacationToUpdate.imageName;
        await vacationService.updateVacation(+id,vacation);
      }
      if(newVacation) {
        await vacationService.createVacation(vacation);
      }
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
            <CustomDateInput name={"dateStart"} control={control} error="Start date is required" />
          <span className={formState.errors.dateStart?.message ?`${classes.errorMessage} ${classes.error}` : classes.errorMessage }>
            {formState.errors.dateStart ? formState.errors.dateStart?.message : "error"}
          </span>
        </label>

        {/* Ending Date */}
        <label>
          <span>Ending Date:</span>
            <CustomDateInput name="dateEnd" control={control} error="End date is required"  /> 
            <span className={formState.errors.dateEnd?.message ?`${classes.errorMessage} ${classes.error}` : classes.errorMessage }>
            {formState.errors.dateEnd ? formState.errors.dateEnd?.message : "error"}
          </span>
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
            {!newVacation ? 'Edit vacation':'Add new vacation'}
          </button>
          {<span className={error !== "error" ?`${classes.errorMessage} ${classes.finalError}`: classes.errorMessage}>{error}</span>}
      </form>
    </section>
  );
}

export default VacationForm;


