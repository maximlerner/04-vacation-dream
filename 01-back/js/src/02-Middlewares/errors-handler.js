"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_error_model_1 = __importDefault(require("../03-Models/client-error-model"));
function errorHandler(err, request, response, next) {
    // Crash, like throw...
    if (err instanceof Error) {
        // Here we do casting err to any if there is err.status we will return the status else not 500
        response.status(err.status || 500).send(err.message);
        return;
    }
    // Client error:
    if (err instanceof client_error_model_1.default) {
        response.status(err.status).send(err.message);
    }
}
{
}
exports.default = errorHandler;
