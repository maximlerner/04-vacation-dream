import Axios from "axios";
import VacationModel from "../Models/VacationModel";
import config from "../Utils/Config";

class VacationService {

  public async getAllVacations(setVacationsList: Function,setError?: Function):Promise<any> {

      try {
        const response = await Axios.get<VacationModel[]>(config.urls.vacations);
        const vacations = response.data;
        setVacationsList(vacations);
      } catch (err: any) {
        if(setError)setError(err)
      }
    }  


  public async deleteVacation(id: number, setVacationsList: Function) {
    try {
      await Axios.delete<number>(`${config.urls.vacations}${id}`);
      this.getAllVacations(setVacationsList);
    } catch (err) {
      alert(err);
    }
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

    // 2) send updated vacation to the client
    const updatedVacation = response.data;
    return updatedVacation;  
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

    // 4) send  created vacation to the client 
    const addedVacation = response.data;
    return addedVacation;  
  }
}


const vacationService = new VacationService();

export default vacationService;

