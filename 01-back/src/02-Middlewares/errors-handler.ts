import { NextFunction, Request, Response } from "express";
import ClientError from "../03-Models/client-error-model";

function errorHandler(err: any ,request: Request,response: Response, next: NextFunction): void {

    // Crash, like throw...
    if(err instanceof Error ) {
        // Here we do casting err to any if there is err.status we will return the status else not 500
        response.status((err as any).status || 500).send(err.message);
        return
    }

    // Client error:
    if(err instanceof ClientError) {
        response.status(err.status).send(err.message);
    }
} {

}

export default errorHandler;