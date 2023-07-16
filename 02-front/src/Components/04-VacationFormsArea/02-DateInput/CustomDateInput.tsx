import {Control, Controller, useForm} from "react-hook-form";
import classes from "../01-VacationForm/VacationForm.module.css";
import {DatePicker} from "antd";
import dayjs from "dayjs";
import { error } from "console";


interface CustomDateInputProps {
    control: Control<any>;
    name: string;
    placeholder?:string
    error: string
  }
  
  function CustomDateInput({control,name,placeholder,error}:CustomDateInputProps) {
    return (
      <Controller
        control={control}
        name={name}
        rules={{
          required: error
        }}
        render={({ field}) => {
          return (
            <>
              <DatePicker
              placeholder={placeholder}
                // className={fieldState.error ? "error" : ""}
                
                className={classes.calendar}
                onBlur={field.onBlur}
                style={{color:"black"}}
                onChange={(date) => {
                  field.onChange(date ? date.valueOf()  : null);
                }}
                value={field.value ? dayjs(field.value) : null}
              />
            </>
          );
        }}
      />
    );
  }

export default CustomDateInput;


