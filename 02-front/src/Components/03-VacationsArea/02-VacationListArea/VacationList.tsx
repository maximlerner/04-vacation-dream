import { useEffect, useState } from "react";

import VacationModel from "../../../Models/VacationModel";
import classes from "./VacationList.module.css";
import Sorting from "../03-Sorting/Sorting";
import Card from "../01-VacationCard/Card";
import Pagination from "../04-Pagination/Pagination";
import LoadingSpinner from "../05-LoadingSpinner/LoadingSpinner";
import vacationService from "../../../Services/VacationService";
import vacationsStore from "../../../Redux/Store";


function VacationsList(): JSX.Element {
  const [vacationList, setVacationList] = useState<VacationModel[]>([]);
  const [filteredVacations,onSetFilterVacations] = useState<VacationModel[]>([]);
  const [filtered,setFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [deleting,setDeleting] = useState(false);
  
  const length = filtered ? filteredVacations.length : vacationsStore.getState().vacations.length;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCardsOriginal = vacationsStore.getState().vacations.slice(firstCardIndex, lastCardIndex);
  const currentCardsFiltered = filteredVacations.slice(firstCardIndex,lastCardIndex);
  const lastPage = Math.ceil(filtered ? currentCardsFiltered.length / cardsPerPage :vacationsStore.getState().vacations.length / cardsPerPage);
  const [user,setUser] = useState<string>("");
  console.log(user);


  useEffect(() => {
    vacationService.getAllVacations(setVacationList, setError);
    setDeleting(false);
  })





  const [error,setError] = useState("");

  return (
    <div className={classes.vacationsList}>
      <Sorting
        vacations={vacationList}
        onFilter={setFiltered}
        onFilterVacations={onSetFilterVacations}
      />
      {/* Will render all vacations if vacations are not filtered */}
      {!filtered &&
        currentCardsOriginal.map((vacation,index) => {
          return (
            <Card
              onSetCurrentPage={setCurrentPage}
              setVacations={setVacationList}
              key={index}
              vacation={vacation}
              setDeleting={setDeleting}
            />
          );
        })}
      {/* Will render only filtered vacation if vacations are filtered  */}
      {filtered &&
        currentCardsFiltered.map((vacation,index) => {
          return (
            <Card
              setVacations={setVacationList}
              onSetCurrentPage={setCurrentPage}
              key={index}
              vacation={vacation}
              setDeleting={setDeleting}
            />
          );
        })}
      {length > 0 && (
        <Pagination
          lastPage={lastPage}
          currentPage={currentPage}
          onChangePage={setCurrentPage}
        />
      )}
      {length < 1 && vacationList.length !== 0 && (
        <p className={classes.noResults}>No Results</p>
      )}
      {(vacationsStore.getState().vacations.length === 0 && error === "")  && <LoadingSpinner />}
      <p className={classes.noResults}>{error ? error : ""}</p>
    </div>
  );
}

export default VacationsList;
