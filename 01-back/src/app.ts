import express, { NextFunction, Request, Response } from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";

import authController from "./06-Controllers/auth-controller"
import vacationController from "./06-Controllers/vacation-controller";
import errorHandler from "./02-Middlewares/errors-handler";
import ClientError from "./03-Models/client-error-model";

const server = express();

// Middlewares
server.use(cors()); // Enable CORS for any website
server.use(expressFileUpload());
server.use(express.json());

// Routes
server.use("/api/auth",authController);
server.use("/api/vacations/", vacationController);

// Will catch all situations when page not found
server.use("*", (request: Request, response: Response, next: NextFunction) => {
    const error = new ClientError(404, "Route not found");

    // Will jump to the Catch-All Middleware
    next(error);
});

//Error middleware
server.use(errorHandler);

server.listen(3001, () => console.log("Listening..."));

