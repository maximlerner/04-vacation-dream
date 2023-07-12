"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var promises_1 = require("fs/promises");
var uuid_1 = require("uuid");
var config_1 = __importDefault(require("./config"));
function safeDelete(absolutePath) {
    try {
        // If undefined /null do nothing:
        if (!absolutePath)
            return;
        // Only if file exists in disk - try to delete it:
        if (fs_1.default.existsSync(absolutePath)) {
            fs_1.default.unlinkSync(absolutePath);
        }
    }
    catch (err) {
        //Save the error to the disc
        saveLog(err);
    }
}
function saveLog(err) {
    return __awaiter(this, void 0, void 0, function () {
        var content, errors, newErrorsLog;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, promises_1.readFile)(config_1.default.errorFile, "utf8")];
                case 1:
                    content = _a.sent();
                    errors = JSON.parse(content);
                    errors.push({ status: err.status, message: err.message, date: new Date() });
                    console.error(content);
                    newErrorsLog = JSON.stringify(errors, null, 4);
                    return [4 /*yield*/, (0, promises_1.writeFile)(config_1.default.errorFile, newErrorsLog)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function saveImage(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var extension;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
                    // Create uuid file name including the original extension
                    vacation.imageName = (0, uuid_1.v4)() + extension;
                    //Save the image to the disc
                    return [4 /*yield*/, vacation.image.mv("./src/00-Assets/Images/".concat(vacation.imageName))];
                case 1:
                    //Save the image to the disc
                    _a.sent();
                    // Delete the image from the model so it won't get back to user:
                    delete vacation.image;
                    return [2 /*return*/, vacation.imageName];
            }
        });
    });
}
// That function recieves an object and returns an object with invalidExpression property message and isForbidden property boolean
function checkForbidenExpresions(object) {
    // 1) Check if the type of parameter is object
    if (typeof object === "object") {
        // a) initial values and values array of the given object
        var result = { invalidExpression: "", isForbidden: false };
        var forbidenExpressionArray = ["'", '"', "select", "insert", "update"];
        var objectValuesArray = Object.values(object).toLocaleString();
        // b) If the objectValuesArray includes any forbidden expression function will return true inside isForbidden property
        for (var i = 0; i < forbidenExpressionArray.length; i++) {
            if (objectValuesArray.toLowerCase().includes(forbidenExpressionArray[i])) {
                result.invalidExpression = "using ".concat(forbidenExpressionArray[i], " is not allowed");
                result.isForbidden = true;
                'using' + forbidenExpressionArray[i] + 'is not allowed';
                // Return on the first time condition is true
                return result;
            }
        }
        // c) If the objectValuesArray doesn't includes any forbidden expression function will return false inside isForbidden property
        return result;
        // 1) If the user inserted incorrect type of data function will return false
    }
    else {
        return false;
    }
}
exports.default = {
    safeDelete: safeDelete,
    saveImage: saveImage,
    checkForbidenExpresions: checkForbidenExpresions
};
