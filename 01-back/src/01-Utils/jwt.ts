import  jwt, { JwtPayload, VerifyErrors }  from "jsonwebtoken";
import UserModel from "../03-Models/user-model";
import config from "./config";
import { Request } from 'express';

const secretKey = "veni-vidi-vici";

function getNewToken(user: UserModel):string {
    const payload = {user}; //payload = object containing our user.
    const token = jwt.sign(payload,secretKey, {expiresIn: config.loginExpiresIn});
    return token;
}

async function verifyToken(request: Request):Promise<boolean> {
    return new Promise((resolve,reject) => {
        try{
            // If missing authorization header:
            if(!request.headers.authorization){
                resolve(false);
                return;
            }
            // Authorization format: "Bearer the-token"
            const token = request.headers.authorization.substring(7);

            // If missing token:
            if(!token){
                resolve(false);
                return;
            }

            // Verify token:
            jwt.verify(token, secretKey, (err: VerifyErrors,payload: JwtPayload) => {

                // If token invalid (expires /wrong format...)
                if(err) {
                    resolve(false);
                    return;
                }

                // Token is valid:
                resolve(true);
            })

        }
        catch(err:any) {
            reject(err);
        }
    })
}

// Must call that function only when token verified:
function getUserFromToken(request: Request): UserModel {

    // Get the token from the request:
    const token = request.headers.authorization.substring(7);

    // Extract the payload:
    const payload = jwt.decode(token);

    // Extract the user from the payload:
    const user = (payload as any).user;

    return user;
}

export default {
    getNewToken,
    verifyToken,
    getUserFromToken
}