import Joi from "joi";
import { UploadedFile } from "express-fileupload";

class VacationModel {
    public vacationID: number;
    public description: string;
    public destination: string;
    public imageName: string;
    public image: UploadedFile
    public dateStart: string;
    public dateEnd: string;
    public price: number;
    public followers: number;
    
    public constructor (vacation: VacationModel) {
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

        // Post validation schema (static will create only one schema object)
        private static postValidationSchema = Joi.object({
            vacationID: Joi.forbidden(),
            description: Joi.string().required().min(10).max(1000),
            destination: Joi.string().required().min(2).max(20),
            imageName: Joi.forbidden(),
            image: Joi.object().required(),
            dateStart: Joi.date().required(),
            dateEnd: Joi.date().required(),
            price: Joi.number().required().positive().min(1).max(99999).strict(),
            followers: Joi.number().integer().min(0).default(0),
        })
        
        // put validation schema 
        private static putValidationSchema = Joi.object({
            vacationID: Joi.number().positive().integer().optional(),
            description: Joi.string().min(10).max(500).required(),
            destination: Joi.string().min(2).max(20).required(),
            dateStart: Joi.date().required(),
            dateEnd: Joi.date().required(),
            price: Joi.number().positive().min(1).max(99999).strict().required(),
            followers: Joi.number().integer().min(0).optional(),
            imageName: Joi.optional(),
            image: Joi.object().optional()
        })
        
        // patch validation schema 
        private static patchValidationSchema = Joi.object({
            vacationID: Joi.number().required().positive().integer(),
            description: Joi.string().min(10).max(500),
            destination: Joi.string().min(2).max(20),
            dateStart: Joi.date(),
            dateEnd: Joi.date(),
            price: Joi.number().positive().min(1).max(99999).strict(),
            followers: Joi.number().integer().min(0).default(0),
            imageName: Joi.forbidden(),
            image: Joi.object().optional()
        })
        
        // Validate Post;
        public validatePostVacation() {
            
            // Validate
            const result = VacationModel.postValidationSchema.validate(this);
    
            // Return error message if exists, or undefined if no errors;
            return result.error?.message;
    
        }
    
        // Validate Put;
        public validatePutVacation() {
    
            // Validate
            const result = VacationModel.putValidationSchema.validate(this);
    
            // Return error message if exists, or undefined if no errors;
            return result.error?.message;
    
        }
    
        // Validate Patch;
        public validatePatchVacation() {
    
            // Validate
            const result = VacationModel.patchValidationSchema.validate(this);
    
            // Return error message if exists, or undefined if no errors;
            return result.error?.message;
    
        }
}

export default VacationModel;