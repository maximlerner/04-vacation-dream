import Joi from "joi";

class CredentialsModel {
    public userName: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.userName = credentials.userName;
        this.password = credentials.password;
    }

    private static credentialsSchema = Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required()
    })

    public validateCredentials() {

        // Validate
        const result = CredentialsModel.credentialsSchema.validate(this);

        // Return error message if exists, or undefined if no errors;
        return result.error?.message
    }
}


export default CredentialsModel;