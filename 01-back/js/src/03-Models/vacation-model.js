"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var VacationModel = /** @class */ (function () {
    function VacationModel(vacation) {
        this.vacationID = vacation.vacationID;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.dateStart = vacation.dateStart;
        this.dateEnd = vacation.dateEnd;
        this.price = vacation.price;
        this.followers = vacation.followers;
    }
    // Validate Post;
    VacationModel.prototype.validatePostVacation = function () {
        var _a;
        // Validate
        var result = VacationModel.postValidationSchema.validate(this);
        // Return error message if exists, or undefined if no errors;
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    // Validate Put;
    VacationModel.prototype.validatePutVacation = function () {
        var _a;
        // Validate
        var result = VacationModel.putValidationSchema.validate(this);
        // Return error message if exists, or undefined if no errors;
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    // Validate Patch;
    VacationModel.prototype.validatePatchVacation = function () {
        var _a;
        // Validate
        var result = VacationModel.patchValidationSchema.validate(this);
        // Return error message if exists, or undefined if no errors;
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    // Post validation schema (static will create only one schema object)
    VacationModel.postValidationSchema = joi_1.default.object({
        vacationID: joi_1.default.forbidden(),
        description: joi_1.default.string().required().min(10).max(1000),
        destination: joi_1.default.string().required().min(2).max(20),
        imageName: joi_1.default.forbidden(),
        image: joi_1.default.object().required(),
        dateStart: joi_1.default.date().required(),
        dateEnd: joi_1.default.date().required(),
        price: joi_1.default.number().required().positive().min(1).max(99999).strict(),
        followers: joi_1.default.number().integer().min(0).default(0),
    });
    // put validation schema 
    VacationModel.putValidationSchema = joi_1.default.object({
        vacationID: joi_1.default.number().positive().integer().optional(),
        description: joi_1.default.string().min(10).max(500).required(),
        destination: joi_1.default.string().min(2).max(20).required(),
        dateStart: joi_1.default.date().required(),
        dateEnd: joi_1.default.date().required(),
        price: joi_1.default.number().positive().min(1).max(99999).strict().required(),
        followers: joi_1.default.number().integer().min(0).optional(),
        imageName: joi_1.default.optional(),
        image: joi_1.default.object().optional()
    });
    // patch validation schema 
    VacationModel.patchValidationSchema = joi_1.default.object({
        vacationID: joi_1.default.number().required().positive().integer(),
        description: joi_1.default.string().min(10).max(500),
        destination: joi_1.default.string().min(2).max(20),
        dateStart: joi_1.default.date(),
        dateEnd: joi_1.default.date(),
        price: joi_1.default.number().positive().min(1).max(99999).strict(),
        followers: joi_1.default.number().integer().min(0).default(0),
        imageName: joi_1.default.forbidden(),
        image: joi_1.default.object().optional()
    });
    return VacationModel;
}());
exports.default = VacationModel;
