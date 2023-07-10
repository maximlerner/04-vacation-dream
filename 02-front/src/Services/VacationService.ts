import Axios from "axios";
import VacationModel from "../Models/VacationModel";
import config from "../Utils/Config";
import vacationsStore from "../Redux/Store";
import { addVactionAction, deleteVacationAction, fetchVacationAction, updateVactionAction } from "../Redux/VacationState";

class VacationService {

  public async getAllVacations(setVacations: Function, setError?: Function):Promise<void> {
    try {
      if (vacationsStore.getState().vacations.length === 0) {
        // If state is empty get vacations from data base
        const response = await Axios.get<VacationModel[]>(config.urls.vacations);
          const vacations = response.data;
          setVacations(vacations);
          
          // Send downloaded vacations to redux
          vacationsStore.dispatch(fetchVacationAction(vacations));
        } 
        else {
        // If state isn't  empty get vacations from vacation store state
        const vacations = vacationsStore.getState().vacations;
        setVacations(vacations);
      }
    } catch (err: any) {
      if (setError) setError(err.message);
    }
  } 

  public async createVacation(vacation: VacationModel):Promise<VacationModel> {
    
    // 1) Format dates
    const start = new Date(vacation.dateStart).toISOString();
    const end  = new Date(vacation.dateEnd).toISOString();

    // 2) Create new form data object
    const myFormData = new FormData();
    myFormData.append("description",vacation.description);
    myFormData.append("destination",vacation.destination);
    myFormData.append("dateStart",start);
    myFormData.append("dateEnd",end);
    myFormData.append("price",vacation.price.toString());
    myFormData.append("image",vacation.image[0]);
    
    // 3) create new vacation
    const response = await Axios.post<VacationModel>(config.urls.vacations,myFormData);

    // 4) send  created vacation to the client and update redux
    const addedVacation = response.data;
    vacationsStore.dispatch(addVactionAction(addedVacation));
    return addedVacation;  
  }

  public async updateVacation(id: number,vacation: VacationModel):Promise<VacationModel> {

    // 2) Format dates
    const start = new Date(vacation.dateStart).toISOString();
    const end  = new Date(vacation.dateEnd).toISOString();
    
    // 1) Create new form data object
    const myFormData = new FormData();
    myFormData.append("description",vacation.description);
    myFormData.append("destination",vacation.destination);
    myFormData.append("dateStart",start);
    myFormData.append("dateEnd",end);
    myFormData.append("price",vacation.price.toString());
    myFormData.append("image",vacation.image[0]);
    myFormData.append("imageName",vacation.imageName);
    myFormData.append("followers",vacation.followers.toString());
    
    // 2) update vacation
    const response = await Axios.put<VacationModel>(`${config.urls.vacations}${id}`,myFormData);

    // 2) send updated vacation to the client and update vacation store state
    const updatedVacation = response.data;
    vacationsStore.dispatch(updateVactionAction(updatedVacation));
    return updatedVacation;  
  }
  
  public async deleteVacation(id: number,setDeleting: Function,setVacations: Function):Promise<void> {
    try {
      await Axios.delete<number>(`${config.urls.vacations}${id}`);
      vacationsStore.dispatch(deleteVacationAction(id));
      setDeleting(true);
      this.getAllVacations(setVacations);
    } catch (err) {
      alert(err);
    }
  }
}

const vacationService = new VacationService();

export default vacationService;

