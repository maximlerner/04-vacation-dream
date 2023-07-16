import fs from 'fs';
import { readFile, writeFile } from "fs/promises";
import {v4 as uuid} from "uuid";
import VacationModel from "../03-Models/vacation-model";
import ImageError from '../03-Models/image-error-model';
import config from './config';

function safeDelete(absolutePath:string): void {
    try {
        // If undefined /null do nothing:
        if(!absolutePath) return;

        // Only if file exists in disk - try to delete it:
        if(fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
       
        }

    } catch(err: any) {
            //Save the error to the disc
            saveLog(err);
        }
    }

async function saveLog(err: any) {
    const content = await readFile(config.errorFile,"utf8");
    const errors: ImageError[] = JSON.parse(content);
    errors.push({status: err.status,message:err.message,date:new Date()});
    console.error(content);
    const newErrorsLog = JSON.stringify(errors,null,4);
    await writeFile(config.errorFile, newErrorsLog);
        
}

async function saveImage(vacation: VacationModel) {
    //  Take the original extension
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));

    // Create uuid file name including the original extension
    vacation.imageName = uuid() + extension

    //Save the image to the disc
    await vacation.image.mv(`./src/00-Assets/Images/${vacation.imageName}`);

    // Delete the image from the model so it won't get back to user:
    delete vacation.image;
    return vacation.imageName;
}

    // That function recieves an object and returns an object with invalidExpression property message and isForbidden property boolean
    function checkForbidenExpresions(object: object) {

        // 1) Check if the type of parameter is object
        if(typeof object === "object") {
  
          // a) initial values and values array of the given object
          const result = {invalidExpression: "",isForbidden: false}
          const forbidenExpressionArray = ["'",'"',"select","insert","update"];
          const objectValuesArray = Object.values(object).toLocaleString();
          
          // b) If the objectValuesArray includes any forbidden expression function will return true inside isForbidden property
          for(let i = 0; i < forbidenExpressionArray.length;i++) {
            if (objectValuesArray.toLowerCase().includes(forbidenExpressionArray[i])) {
              result.invalidExpression = `using ${forbidenExpressionArray[i]} is not allowed`;
              result.isForbidden = true
              'using' + forbidenExpressionArray[i] + 'is not allowed'
  
              // Return on the first time condition is true
              return result
            }
          }
          // c) If the objectValuesArray doesn't includes any forbidden expression function will return false inside isForbidden property
          return result
        // 1) If the user inserted incorrect type of data function will return false
        } else {
          return false
        }
      }

export default {
    safeDelete,
    saveImage,
    checkForbidenExpresions
};