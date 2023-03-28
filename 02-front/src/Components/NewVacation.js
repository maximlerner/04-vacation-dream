import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import classes from  "./NewVacation.module.css";

const schema = yup.object({
  description: yup.string().required("Description name is required"),
  destination: yup.string().required("Destination is required"),
  image: yup.mixed().required("Image is required"),
  dateStart: yup.date().required("Begining date is required"),
  dateEnd: yup.date().required("Ending date is required"),
  price: yup.number().required("Price is required"),
});

//Made for minimum date choise in the input
let currentDate = new Date();
let minDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

function NewVacation() {
  const [_description, setDescription] = useState("");
  const [_destination, setDestination] = useState("");
  const [_dateStart, setDateStart] = useState("");
  const [_dateEnd, setDateEnd] = useState("");
  const [_price, setPrice] = useState("");
  const [_imageFile, setImageFile] = useState({
    File: [],
  });

  const {register,formState: { errors },handleSubmit,} = useForm({
    resolver: yupResolver(schema),
  });

  const handleImageChange = (event) => {
    setImageFile({
      ..._imageFile,
      file: event.target.files[0],     
    })
    console.log(_imageFile)
  }

  const onSubmit = async ()  => {
    console.log(_imageFile)
    const formdata = new FormData();
    formdata.append('myFile',_imageFile.File)
    axios
      .post(`http://localhost:3030/newVacation`, {
        description: _description,
        destination: _destination,
        image: _imageFile,
        dateStart: _dateStart,
        dateEnd: _dateEnd,
        price: _price,
      })
      .then(() => {
        alert("ok");
        setDescription('');
        setDestination('');
        setImageFile('');
        setDateStart('');
        setDateEnd('');
        setPrice('');
      });
  };
  return (
    <>
      <h1>New Vacation</h1>
      <form method="post" action="../03-uploads" className={classes.newVacation} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <label>
          <span>Description:</span>
          <input
            value={_description}
            placeholder="Description"
            {...register("description")}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <span>{errors.description?.message}</span>
        </label>
        
        <label>
          <span>Destination:</span>
          <input
            placeholder="Destination"
            value={_destination}
            {...register("destination")}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
          />
          <span>{errors.destination?.message}</span>
        </label>

        <label>
          <span>Image:</span>
          <input
            type="file"
            name="myFile"
            accept="images/*"
            placeholder="Image"
            {...register("image")}
            onChange={handleImageChange}
            // onChange={(e) => {
            //   setImageFile(e.target.files);
            // }}
          />
          <span>{errors.image?.message}</span>
        </label>

        <label>
          <span>Starting Date:</span>
          <input
            type="date"
            placeholder="Date"
            min={minDate}
            value={_dateStart}
            {...register("dateStart")}
            onChange={(e) => {
              setDateStart(e.target.value);
            }}
          />
          <span>{errors.dateStart?.message}</span>
        </label>

        <label>
          <span>Ending Date:</span>
          <input
            type="date"
            placeholder="Date"
            value={_dateEnd}
            {...register("dateEnd")}
            onChange={(e) => {
              setDateEnd(e.target.value);
            }}
          />
          <span>{errors.dateEnd?.message}</span>
        </label>

        <label>
          <span>Price:</span>
          <input
            placeholder="Price"
            value={_price}
            {...register("price")}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <span>{errors.price?.message}</span>
        </label>

        <button className={classes.box} type="submit">Add new vacation</button>
      </form>
    </>
  );
}

export default NewVacation;