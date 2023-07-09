import express, {NextFunction, Request,Response} from "express";
import UserModel from "../03-Models/user-model";
import authLogic from "../05-BLL/auth-logic";
import ClientError from "../03-Models/client-error-model";
import CredentialsModel from "../03-Models/credentials-model";

const router = express.Router();

// POST api/auth/register
router.post("/register", async(request: Request, response: Response, next: NextFunction) => {
    try{
        const user = new UserModel(request.body);
        const token = await authLogic.register(user);
        if(token === "Username isn't available") {
            const error = "User name is already being used by someone else!"
            throw new ClientError(400,error);
        } 
        response.status(201).json(token);
    } 
    catch(err: any) {
        next(err)
    }
});

// POST api/auth/login
router.post("/login", async(request: Request, response: Response, next: NextFunction) => {
    try{
        const credentials = new CredentialsModel(request.body);
        const token = await authLogic.login(credentials); 
        response.status(201).json(token);
    } 
    catch(err: any) {
        next(err)
    }
});

export default router;