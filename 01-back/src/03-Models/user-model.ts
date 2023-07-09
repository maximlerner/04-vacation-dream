import Joi from "joi";
import Role from "./role";

class UserModel {
    public userID: number;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public role: Role;

    public constructor(user: UserModel) {
        this.userID = user.userID;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.password = user.password;
        this.role = user.role;
    }

    private static registerValidationSchema = Joi.object({
        userID: Joi.forbidden(),
        firstName : Joi.string().required().min(2).max(100),
        lastName : Joi.string().required().min(2).max(100),
        userName : Joi.string().required().min(2).max(100),
        password : Joi.string().required().min(6).max(100),
        role : Joi.forbidden()

    })

    // Validate Register
    public validateRegister() {
        const result = UserModel.registerValidationSchema.validate(this);

        // Return error message if exists, or undefined if no errors;
        return result.error?.message;
    }

    // Find out if username exists or not return true or false accordingly.
    public isAvailableUser(users :UserModel[],user: UserModel) {
        const userExist = users.some((dbUser) => dbUser.userName === user.userName);
        return !userExist;   
    }
}
export default UserModel;