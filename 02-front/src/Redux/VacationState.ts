import VacationModel from "../Models/VacationModel";

// Vacations AppState - The application level data:
export class VacationsState {
  public vacations: VacationModel[] = [];
}

// Vacation Action type = whitch actions we can perform on the data:
export enum VacationActionType {
  FetchVactions = "FetchVactions", // Must be a strings!
  AddVacation = "AddVacation",
  UpdateVacation = "UpdateVacation",
  DeleteVacation = "DeleteVacation",
}

// Vacation Action - A single object containing data to perform for a single action type
export interface VacationsAction {
  type: VacationActionType; // The action type
  payload: any; // The action data
}

// Vacations actions creators - functions for creating action for sending to dispatch
export function fetchVacationAction(vacations: VacationModel[]): VacationsAction {
  return { type: VacationActionType.FetchVactions, payload: vacations };
}

export function addVactionAction(vacationToAdd: VacationModel): VacationsAction {
  return { type: VacationActionType.AddVacation, payload: vacationToAdd };
}

export function updateVactionAction(vacationToUpdate: VacationModel): VacationsAction {
  return { type: VacationActionType.UpdateVacation, payload: vacationToUpdate };
}

export function deleteVacationAction(vacationToDelete: number): VacationsAction {
  return { type: VacationActionType.DeleteVacation, payload: vacationToDelete };
}

// Vacations Reducer - the function actually performing the operations
export function vacationsReducer(currentVacationState: VacationsState = new VacationsState(),action: VacationsAction): VacationsState {

  //Duplicate the current vacations state into a new one
  const newVacationsState = { ...currentVacationState };

  switch (action.type) {

    case VacationActionType.FetchVactions: // Here action.payload is vacations array
      newVacationsState.vacations = action.payload;
      break;

    case VacationActionType.AddVacation: //  Here action.payload is vacation to add
      newVacationsState.vacations.push(action.payload);
      break;
    case VacationActionType.UpdateVacation: //  Here action.payload is vacation to update
      const indexToUpdate = newVacationsState.vacations.findIndex(
        (v) => v.vacationID === action.payload.vacationID
      );
      newVacationsState.vacations[indexToUpdate] = action.payload;
      break;
    case VacationActionType.DeleteVacation: //  Here action.payload is id of vacation to delete
      const indexToDelete = newVacationsState.vacations.findIndex((v) => v.vacationID === action.payload);
      newVacationsState.vacations.splice(indexToDelete, 1); // delete only one item
      break;
  }

  return newVacationsState;
}
