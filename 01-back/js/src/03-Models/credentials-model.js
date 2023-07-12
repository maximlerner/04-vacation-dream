"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var CredentialsModel = /** @class */ (function () {
    function CredentialsModel(credentials) {
        this.userName = credentials.userName;
        this.password = credentials.password;
    }
    CredentialsModel.prototype.validateCredentials = function () {
        var _a;
        // Validate
        var result = CredentialsModel.credentialsSchema.validate(this);
        // Return error message if exists, or undefined if no errors;
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    CredentialsModel.credentialsSchema = joi_1.default.object({
        userName: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    });
    return CredentialsModel;
}());
exports.default = CredentialsModel;
