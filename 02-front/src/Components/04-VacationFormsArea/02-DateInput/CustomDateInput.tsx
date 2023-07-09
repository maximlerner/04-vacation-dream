import {Control, Controller, useForm} from "react-hook-form";
import {DatePicker} from "antd";
import dayjs from "dayjs";


interface CustomDateInputProps {
    control: Control<any>;
    name: string;
    placeholder?:string
  }
  
  function CustomDateInput({control,name,placeholder}:CustomDateInputProps) {
    return (
      <Controller
        control={control}
        name={name}
        rules={{
          required: "This field is required"
        }}
        render={({ field, fieldState }) => {
          return (
            <>
              <DatePicker
              placeholder={placeholder}
                className={fieldState.error ? "error" : ""}
                onBlur={field.onBlur}
                onChange={(date) => {
                  field.onChange(date ? date.valueOf()  : null);
                }}
                value={field.value ? dayjs(field.value) : null}
              />
              {fieldState.error && <span>{fieldState.error.message}</span>}
            </>
          );
        }}
      />
    );
  }

export default CustomDateInput;

//////////////////////////////////////////










// import { useForm, Controller } from "react-hook-form";
// import dayjs from "dayjs";
// import { DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";


// interface CustomDateInputProps {
//     date:Date 
//     onDateChange: Function;
//   }
  
//   function CustomDateInput({date,onDateChange}:CustomDateInputProps) {

//     const handleDateChange = (newDate: any) => {
//       console.log(newDate,typeof newDate)  
//       onDateChange(newDate);
//     };
//     return (
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoItem>
//           <DatePicker
//             defaultValue={dayjs(date)}
//             disablePast={true}
//             slotProps={{ textField: { size: "small" } }}
//             onChange={(newDate) => handleDateChange(newDate)}
//           />
//         </DemoItem>
//       </LocalizationProvider>
//     );
//   }

// export default CustomDateInput;

