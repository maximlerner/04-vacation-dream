import { createStore } from "redux";
import { vacationsReducer } from "./VacationState";

const vacationsStore = createStore(vacationsReducer);

export default vacationsStore;
