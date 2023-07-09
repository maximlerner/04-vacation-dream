import jwt from "../01-Utils/jwt";
import ClientError from "../03-Models/client-error-model";
import CredentialsModel from "../03-Models/credentials-model";
import Role from "../03-Models/role";
import UserModel from "../03-Models/user-model";
import dal from "../04-DAL/dal";

async function register(user:UserModel): Promise<string> {

    // Get all users:
    const getALLUsersSql = "SELECT * FROM users_list"
    const users = await dal.execute(getALLUsersSql);

    // Check if userName isn't used already:
    const isAvailable = user.isAvailableUser(users,user);
    if(!isAvailable) return "Username isn't available";

    // Check schema if not correct send to the client 400 validation error
    const userModelErrors = user.validateRegister();
    if(userModelErrors) throw new ClientError(400, userModelErrors);

    // Set role as Role.user:
    user.role = Role.user;

    // Add to database:
    users.push(user);
    const addUserSql = `INSERT INTO  users_list (firstName,lastName,userName,password,role) VALUES ('
    ${user.firstName}',
    '${user.lastName}',
    '${user.userName}',
    '${user.password}',
    '${user.role}')`

    await dal.execute(addUserSql)

    // Remove password
    delete user.password;

    // Generate new token;
    const token = jwt.getNewToken(user);

    return token;
}

async function login(credentials:CredentialsModel): Promise<string> {

    // Find given user:
    const sql = `SELECT * FROM users_list WHERE userName = '${credentials.userName}' `
    const user = await dal.execute(sql);

    // If incorrect credentials:
    if(!user) throw new ClientError(401,"Username or password are incorrect!");

    // Remove password
    delete user.password;

    // Generate new token;
    const token = jwt.getNewToken(user);

    return token;
}

export default {
    register,
    login
}
