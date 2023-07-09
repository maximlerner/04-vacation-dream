import { useState } from "react";

import VacationModel from "../../../Models/VacationModel";
import classes from "./VacationList.module.css";
import Sorting from "../03-Sorting/Sorting";
import Card from "../01-VacationCard/Card";
import Pagination from "../04-Pagination/Pagination";
import LoadingSpinner from "../05-LoadingSpinner/LoadingSpinner";

interface MainProps {
  cards: VacationModel[];
  onSetVacationList: Function;
  filteredVacations: VacationModel[];
  onUpdateVacation: Function;
  userType: string;
  filtered: boolean;
  onFilter: Function;
  onFilterVacations: Function;
  error: string;
}

function VacationsList({
  cards,onSetVacationList,filteredVacations,onUpdateVacation,userType,filtered,onFilter,onFilterVacations,error
}: MainProps): JSX.Element {

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  
  const length = filtered ? filteredVacations.length : cards.length;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCardsOriginal = cards.slice(firstCardIndex, lastCardIndex);
  const currentCardsFiltered = filteredVacations.slice(firstCardIndex,lastCardIndex);
  const lastPage = Math.ceil(cards.length / cardsPerPage);

  return (
    <div className={classes.vacationsList}>
      <Sorting
        vacations={cards}
        // filtered={filtered}
        // filteredVacations={filteredVacations}
        onFilter={onFilter}
        onFilterVacations={onFilterVacations}
      />
      {/* Will render all vacations if vacations are not filtered */}
      {!filtered &&
        currentCardsOriginal.map((vacation) => {
          return (
            <Card
              onSetVacationList={onSetVacationList}
              userType={userType}
              key={vacation.vacationID}
              onUpdateVacation={onUpdateVacation}
              vacation={vacation}
            />
          );
        })}
      {/* Will render only filtered vacation if vacations are filtered  */}
      {filtered &&
        currentCardsFiltered.map((vacation) => {
          return (
            <Card
              onSetVacationList={onSetVacationList}
              userType={userType}
              key={vacation.vacationID}
              onUpdateVacation={onUpdateVacation}
              vacation={vacation}
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
      {length < 1 && cards.length !== 0 && (
        <p className={classes.noResults}>No Results</p>
      )}
      {(cards.length === 0 && error === "")  && <LoadingSpinner />}
      {/* <p>{error ? error : ""}</p> */}
    </div>
  );
}

export default VacationsList;
