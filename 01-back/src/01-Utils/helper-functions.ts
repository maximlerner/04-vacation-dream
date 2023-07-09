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

export default {
    safeDelete,
    saveImage
};