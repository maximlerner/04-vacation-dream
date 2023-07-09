import ClientError from "../03-Models/client-error-model";
import VacationModel from "../03-Models/vacation-model";
import dal from "../04-DAL/dal";
import helpers from "../01-Utils/helper-functions";
import { OkPacket } from "mysql";

//--------------------------------------------------------------------
// Get all vacations function
async function getAllVactions(): Promise<VacationModel[]> {
    const sql = "SELECT * FROM vacation_list"
    const vacations = await dal.execute(sql);
    return vacations;
}

//--------------------------------------------------------------------
// Get one vacation function
async function getOneVaction(id: number): Promise<VacationModel> {
    const sql = `SELECT * FROM vacation_list WHERE vacationID = ${id}`
    const vacations = await dal.execute(sql);
    const vacation = vacations[0]
    if(!vacation) throw new ClientError(404,`id ${id} not found`) ;
    return vacation;
}

//--------------------------------------------------------------------------
// Add one vacation function
async function addVaction(vacation: VacationModel): Promise<VacationModel> {
    // 1) For postman
    vacation.price = Number(vacation.price);
    vacation.followers = Number(vacation.followers);

    // 2) Check schema if not correct send to the client 400 validation error
    const errors = vacation.validatePostVacation();
    if(errors) throw new ClientError(400, errors);
    
    // 3) Save image
    vacation.imageName = await helpers.saveImage(vacation);

    // 4) Add new vacation to data base
    const sql = `INSERT INTO vacation_list (description,destination,imageName,dateStart,dateEnd,price,followers) VALUES 
    (
        "${vacation.description}",
        "${vacation.destination}",
        "${vacation.imageName}",
        "${vacation.dateStart}",
        "${vacation.dateEnd}",
        ${vacation.price},
        ${vacation.followers}
    );`
    const info: OkPacket = await dal.execute(sql);     
    // 5) Add id to vacation object and send back to user
    vacation.vacationID = info.insertId;
    return vacation;
}

//--------------------------------------------------------------------------
// Update entire vacation function
async function updateFullVaction(vacation: VacationModel,validate = true): Promise<VacationModel> {
    // 1) For postman
    if(vacation.price) vacation.price = Number(vacation.price);
    if(vacation.followers) vacation.followers = Number(vacation.followers);

    if(vacation.imageName) delete vacation.imageName;
    
    // 2) If no id then return error
    if(!vacation) throw new ClientError(404,`vacation with id ${vacation.vacationID} not found`); 
    
    // 3) Check schema if not correct send to the client 400 validation error
    if(validate) {
        const errors = vacation.validatePutVacation();
        if(errors) throw new ClientError(400, errors);
    }
    // 4) If  we have an a image to update:
    if(vacation.image) {
        // a)Get the original vacation from database
        const dbVacation: VacationModel = await getOneVaction(vacation.vacationID);
        
        // b) Delete prev image from disk
        helpers.safeDelete(`./src/00-Assets/Images/${dbVacation.imageName}`);
        
        // c) Save new image and return the new image name for updating database later
        vacation.imageName = await helpers.saveImage(vacation);
        
    }
    // 5) Update database
    const sql = `UPDATE vacation_list SET 
    description = "${vacation.description}",
    destination = "${vacation.destination}",
    imageName = "${vacation.imageName}",
    dateStart = "${vacation.dateStart}",
    dateEnd = "${vacation.dateEnd}",
    price = ${vacation.price},
    followers = ${vacation.followers}
    WHERE vacationID = ${vacation.vacationID}`;
    console.log(sql);
    
    await dal.execute(sql);
    return vacation;
}

//--------------------------------------------------------------------------
// Update part of vacation function
async function updatePartialVaction(vacation: VacationModel): Promise<VacationModel> {
    // 1) For postman
    if(vacation.price) vacation.price = Number(vacation.price);
    if(vacation.followers) vacation.followers = Number(vacation.followers);

    // 2) Check schema if not correct send to the client 400 validation error
    const errors = vacation.validatePatchVacation();
    if(errors)  throw new ClientError(400, errors);

    // 3) Get vacation from data base update the given values
    const dbVacation = await getOneVaction(vacation.vacationID);
    for(const prop in vacation) {
        if(vacation[prop] !== undefined) {
            dbVacation[prop] = vacation[prop];
        }
    }

    // 4) Call updateFullVaction(second parameter is for disabling validatePutVacation check)
    vacation = await updateFullVaction(dbVacation,false);
    return vacation;
}

// Delete vacation function
async function deleteVaction(id: number): Promise<void> {

    let dbVacation: VacationModel;

    // If provided id then get vacation from data base
    if(id) {
        dbVacation = await getOneVaction(id);

        // Delete image from disk using vacation info from data base
        helpers.safeDelete(`./src/00-Assets/Images/${dbVacation.imageName}`);
    }
    // Delete vacation from data base
    const sql = "DELETE FROM vacation_list WHERE vacationID = " + id;
    await dal.execute(sql);
}

export default {
    getAllVactions,
    getOneVaction,
    addVaction,
    updateFullVaction,
    updatePartialVaction,
    deleteVaction
}