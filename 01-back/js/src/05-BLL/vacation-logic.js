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
var client_error_model_1 = __importDefault(require("../03-Models/client-error-model"));
var dal_1 = __importDefault(require("../04-DAL/dal"));
var helper_functions_1 = __importDefault(require("../01-Utils/helper-functions"));
//--------------------------------------------------------------------
// Get all vacations function
function getAllVactions() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM vacation_list";
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    vacations = _a.sent();
                    return [2 /*return*/, vacations];
            }
        });
    });
}
//--------------------------------------------------------------------
// Get one vacation function
function getOneVaction(id) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacations, vacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM vacation_list WHERE vacationID = ".concat(id);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    vacations = _a.sent();
                    vacation = vacations[0];
                    if (!vacation)
                        throw new client_error_model_1.default(404, "id ".concat(id, " not found"));
                    return [2 /*return*/, vacation];
            }
        });
    });
}
//--------------------------------------------------------------------------
// Add one vacation function
function addVaction(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, _a, sql, info;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // 1) For postman
                    vacation.price = Number(vacation.price);
                    vacation.followers = Number(vacation.followers);
                    errors = vacation.validatePostVacation();
                    if (errors)
                        throw new client_error_model_1.default(400, errors);
                    // 3) Save image
                    _a = vacation;
                    return [4 /*yield*/, helper_functions_1.default.saveImage(vacation)];
                case 1:
                    // 3) Save image
                    _a.imageName = _b.sent();
                    sql = "INSERT INTO vacation_list (description,destination,imageName,dateStart,dateEnd,price,followers) VALUES \n    (\n        \"".concat(vacation.description, "\",\n        \"").concat(vacation.destination, "\",\n        \"").concat(vacation.imageName, "\",\n        \"").concat(vacation.dateStart, "\",\n        \"").concat(vacation.dateEnd, "\",\n        ").concat(vacation.price, ",\n        ").concat(vacation.followers, "\n    );");
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 2:
                    info = _b.sent();
                    // 5) Add id to vacation object and send back to user
                    vacation.vacationID = info.insertId;
                    return [2 /*return*/, vacation];
            }
        });
    });
}
//--------------------------------------------------------------------------
// Update entire vacation function
function updateFullVaction(vacation, validate) {
    if (validate === void 0) { validate = true; }
    return __awaiter(this, void 0, void 0, function () {
        var errors, dbVacation, _a, sql;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // 1) For postman
                    if (vacation.price)
                        vacation.price = Number(vacation.price);
                    if (vacation.followers)
                        vacation.followers = Number(vacation.followers);
                    if (vacation.imageName)
                        delete vacation.imageName;
                    // 2) If no id then return error
                    if (!vacation)
                        throw new client_error_model_1.default(404, "vacation with id ".concat(vacation.vacationID, " not found"));
                    // 3) Check schema if not correct send to the client 400 validation error
                    if (validate) {
                        errors = vacation.validatePutVacation();
                        if (errors)
                            throw new client_error_model_1.default(400, errors);
                    }
                    if (!vacation.image) return [3 /*break*/, 3];
                    return [4 /*yield*/, getOneVaction(vacation.vacationID)];
                case 1:
                    dbVacation = _b.sent();
                    // b) Delete prev image from disk
                    helper_functions_1.default.safeDelete("./src/00-Assets/Images/".concat(dbVacation.imageName));
                    // c) Save new image and return the new image name for updating database later
                    _a = vacation;
                    return [4 /*yield*/, helper_functions_1.default.saveImage(vacation)];
                case 2:
                    // c) Save new image and return the new image name for updating database later
                    _a.imageName = _b.sent();
                    _b.label = 3;
                case 3:
                    sql = "UPDATE vacation_list SET \n    description = \"".concat(vacation.description, "\",\n    destination = \"").concat(vacation.destination, "\",\n    imageName = \"").concat(vacation.imageName, "\",\n    dateStart = \"").concat(vacation.dateStart, "\",\n    dateEnd = \"").concat(vacation.dateEnd, "\",\n    price = ").concat(vacation.price, ",\n    followers = ").concat(vacation.followers, "\n    WHERE vacationID = ").concat(vacation.vacationID);
                    console.log(sql);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 4:
                    _b.sent();
                    return [2 /*return*/, vacation];
            }
        });
    });
}
//--------------------------------------------------------------------------
// Update part of vacation function
function updatePartialVaction(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dbVacation, prop;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 1) For postman
                    if (vacation.price)
                        vacation.price = Number(vacation.price);
                    if (vacation.followers)
                        vacation.followers = Number(vacation.followers);
                    errors = vacation.validatePatchVacation();
                    if (errors)
                        throw new client_error_model_1.default(400, errors);
                    return [4 /*yield*/, getOneVaction(vacation.vacationID)];
                case 1:
                    dbVacation = _a.sent();
                    for (prop in vacation) {
                        if (vacation[prop] !== undefined) {
                            dbVacation[prop] = vacation[prop];
                        }
                    }
                    return [4 /*yield*/, updateFullVaction(dbVacation, false)];
                case 2:
                    // 4) Call updateFullVaction(second parameter is for disabling validatePutVacation check)
                    vacation = _a.sent();
                    return [2 /*return*/, vacation];
            }
        });
    });
}
// Delete vacation function
function deleteVaction(id) {
    return __awaiter(this, void 0, void 0, function () {
        var dbVacation, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id) return [3 /*break*/, 2];
                    return [4 /*yield*/, getOneVaction(id)];
                case 1:
                    dbVacation = _a.sent();
                    // Delete image from disk using vacation info from data base
                    helper_functions_1.default.safeDelete("./src/00-Assets/Images/".concat(dbVacation.imageName));
                    _a.label = 2;
                case 2:
                    sql = "DELETE FROM vacation_list WHERE vacationID = " + id;
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    getAllVactions: getAllVactions,
    getOneVaction: getOneVaction,
    addVaction: addVaction,
    updateFullVaction: updateFullVaction,
    updatePartialVaction: updatePartialVaction,
    deleteVaction: deleteVaction
};
