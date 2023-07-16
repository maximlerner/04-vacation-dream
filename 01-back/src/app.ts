import express, { NextFunction, Request, Response } from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv"; // .env
dotenv.config();

import authController from "./06-Controllers/auth-controller"
import vacationController from "./06-Controllers/vacation-controller";
import errorHandler from "./02-Middlewares/errors-handler";
import ClientError from "./03-Models/client-error-model";
import config from "./01-Utils/config";
import path from "path/posix";

const server = express();

// Middlewares
server.use(cors()); // Enable CORS for any website
server.use(expressFileUpload());
server.use(express.json());

// Set the folder of index.html:
server.use(express.static(path.join(__dirname, "./07-Frontend")));

// Routes
server.use("/api/auth",authController);
server.use("/api/vacations/", vacationController);

// Will catch all situations when page not found
server.use("*", (request: Request, response: Response, next: NextFunction) => {
    // const error = new ClientError(404, "Route not found");

    // Will jump to the Catch-All Middleware
    // next(error);

    // Send back index.html on any rout-not-found:(SPA behavior)
    response.sendFile(path.join(__dirname,"./07-Frontend/index.html"));
});

//Error middleware
server.use(errorHandler);

server.listen(config.port, () => console.log("Listening..."));


