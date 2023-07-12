"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var UserModel = /** @class */ (function () {
    function UserModel(user) {
        this.userID = user.userID;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.password = user.password;
        this.role = user.role;
    }
    // Validate Register
    UserModel.prototype.validateRegister = function () {
        var _a;
        var result = UserModel.registerValidationSchema.validate(this);
        // Return error message if exists, or undefined if no errors;
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    // Find out if username exists or not return true or false accordingly.
    UserModel.prototype.isAvailableUser = function (users, user) {
        var userExist = users.some(function (dbUser) { return dbUser.userName === user.userName; });
        return !userExist;
    };
    UserModel.registerValidationSchema = joi_1.default.object({
        userID: joi_1.default.forbidden(),
        firstName: joi_1.default.string().required().min(2).max(100),
        lastName: joi_1.default.string().required().min(2).max(100),
        userName: joi_1.default.string().required().min(2).max(100),
        password: joi_1.default.string().required().min(6).max(100),
        role: joi_1.default.forbidden()
    });
    return UserModel;
}());
exports.default = UserModel;
