import axios from "axios";
import UserModel from "../Models/UserModel";
import config from "../Utils/Config";
import CredentialsModel from "../Models/CredentialsModel";


class AuthService {

    public async register(user:UserModel): Promise<string> {
        const response = await axios.post<string>(config.urls.register,user);
        const token = response.data;
        return token;
    }

    public async login(credentials:CredentialsModel): Promise<string> {
        const response = await axios.post<string>(config.urls.login, credentials);
        const token = response.data;
        return token;
    }

    public logout(): void {
        localStorage.removeItem("token")
    }
}

const authService = new AuthService;

export default authService;