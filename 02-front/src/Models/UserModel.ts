
class UserModel {
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public constructor(user: UserModel) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.password = user.password;
    }
}

export default UserModel;