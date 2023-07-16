import express, {NextFunction, Request,Response} from "express";
import path from "path";
import VacationModel from "../03-Models/vacation-model";
import vacationLogic from "../05-BLL/vacation-logic";
import verifyToken from "../02-Middlewares/verify-token";
import verifyAdmin from "../02-Middlewares/verify-admin";
import fs from 'fs';

const router = express.Router();

// Example: Get all vacations from http://localhost:3001/api/vacations/
router.get('/', async(request: Request, response: Response,next: NextFunction) => {
    try {
        const vacations = await vacationLogic.getAllVactions();  
        response.json(vacations);
        
    } catch (err: any) {
        next(err);
    }
});

// Example: Get first vacation from http://localhost:3001/api/vacations/1
router.get('/:id', async (request: Request, response: Response,next: NextFunction) => {
    try {
        const id = Number(request.params.id);
        const vacation = await vacationLogic.getOneVaction(id);
        response.json(vacation);
        
    } catch(err:any) {
        next(err);
    }
});

// Example: Add new vacation from http://localhost:3001/api/vacations/
router.post('/',verifyToken,verifyAdmin,async (request: Request, response: Response,next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        request.body.followers = 0;
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationLogic.addVaction(vacation);
        response.status(201).json(addedVacation);
        
    } catch(err) {
        next(err)
    }
});

// Example: Update full vacation from http://localhost:3001/api/vacations/1
router.put('/:id',verifyToken,verifyAdmin,async (request: Request, response: Response,next: NextFunction) => {
    try {
        const id = Number(request.params.id);
        console.log("id:" + id);
        request.body.vacationID = id;
        request.body.followers = Number(request.body.followers);
        request.body.image = request.files?.image;
        console.log(request.body);
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationLogic.updateFullVaction(vacation);
        response.json(updatedVacation);
        
    } catch(err:any) {
        next(err);
    } 
});

// Example: Update partial vacation from http://localhost:3001/api/vacations/1
router.patch('/:id',verifyToken,verifyAdmin, async (request: Request, response: Response,next: NextFunction) => {
    try {
        const id = Number(request.params.id);
        request.body.vacationID = id;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationLogic.updatePartialVaction(vacation);
        response.json(updatedVacation);
        
    } catch(err:any) {
        next(err);
    }
});

// Example: delete vacation from http://localhost:3001/api/vacations/1
router.delete('/:id',async (request: Request, response: Response,next: NextFunction) => {
    try {
        const id = Number(request.params.id);
        await vacationLogic.deleteVaction(id);
        response.sendStatus(204);

    } catch(err:any) {
        next(err);
    }
});

// Example: get image vacation from http://localhost:3001/api/vacations/images/6b2a4c61-b09b-4c76-ac78-2f5609602efd.jpeg
router.get("/images/:imageName", (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        let absolutePath = path.join(__dirname, "..", "00-Assets", "Images", imageName);
        if(!fs.existsSync(absolutePath)) absolutePath = path.join(__dirname, "..", "00-Assets", "Images", "404.jpg");
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});




export default router;



