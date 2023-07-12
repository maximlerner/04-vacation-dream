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
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var vacation_model_1 = __importDefault(require("../03-Models/vacation-model"));
var vacation_logic_1 = __importDefault(require("../05-BLL/vacation-logic"));
var verify_token_1 = __importDefault(require("../02-Middlewares/verify-token"));
var verify_admin_1 = __importDefault(require("../02-Middlewares/verify-admin"));
var fs_1 = __importDefault(require("fs"));
var router = express_1.default.Router();
// Example: Get all vacations from http://localhost:3001/api/vacations/
router.get('/', function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vacations, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, vacation_logic_1.default.getAllVactions()];
            case 1:
                vacations = _a.sent();
                response.json(vacations);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Example: Get first vacation from http://localhost:3001/api/vacations/1
router.get('/:id', function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vacation, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = Number(request.params.id);
                return [4 /*yield*/, vacation_logic_1.default.getOneVaction(id)];
            case 1:
                vacation = _a.sent();
                response.json(vacation);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Example: Add new vacation from http://localhost:3001/api/vacations/
router.post('/', verify_token_1.default, verify_admin_1.default, function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vacation, addedVacation, err_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
                request.body.followers = 0;
                vacation = new vacation_model_1.default(request.body);
                return [4 /*yield*/, vacation_logic_1.default.addVaction(vacation)];
            case 1:
                addedVacation = _b.sent();
                response.status(201).json(addedVacation);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Example: Update full vacation from http://localhost:3001/api/vacations/1
router.put('/:id', verify_token_1.default, verify_admin_1.default, function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vacation, updatedVacation, err_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = Number(request.params.id);
                console.log("id:" + id);
                request.body.vacationID = id;
                request.body.followers = Number(request.body.followers);
                request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
                console.log(request.body);
                vacation = new vacation_model_1.default(request.body);
                return [4 /*yield*/, vacation_logic_1.default.updateFullVaction(vacation)];
            case 1:
                updatedVacation = _b.sent();
                response.json(updatedVacation);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Example: Update partial vacation from http://localhost:3001/api/vacations/1
router.patch('/:id', verify_token_1.default, verify_admin_1.default, function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vacation, updatedVacation, err_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = Number(request.params.id);
                request.body.vacationID = id;
                request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
                vacation = new vacation_model_1.default(request.body);
                return [4 /*yield*/, vacation_logic_1.default.updatePartialVaction(vacation)];
            case 1:
                updatedVacation = _b.sent();
                response.json(updatedVacation);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                next(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Example: delete vacation from http://localhost:3001/api/vacations/1
router.delete('/:id', function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = Number(request.params.id);
                return [4 /*yield*/, vacation_logic_1.default.deleteVaction(id)];
            case 1:
                _a.sent();
                response.sendStatus(204);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                next(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Example: get image vacation from http://localhost:3001/api/vacations/images/6b2a4c61-b09b-4c76-ac78-2f5609602efd.jpeg
router.get("/images/:imageName", function (request, response, next) {
    try {
        var imageName = request.params.imageName;
        var absolutePath = path_1.default.join(__dirname, "..", "00-Assets", "Images", imageName);
        if (!fs_1.default.existsSync(absolutePath))
            absolutePath = path_1.default.join(__dirname, "..", "00-Assets", "Images", "404.jpg");
        response.sendFile(absolutePath);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;