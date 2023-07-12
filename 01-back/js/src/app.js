"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv")); // .env
dotenv_1.default.config();
var auth_controller_1 = __importDefault(
  require("./06-Controllers/auth-controller")
);
var vacation_controller_1 = __importDefault(
  require("./06-Controllers/vacation-controller")
);
var errors_handler_1 = __importDefault(
  require("./02-Middlewares/errors-handler")
);
var config_1 = __importDefault(require("./01-Utils/config"));
var posix_1 = __importDefault(require("path/posix"));
var server = (0, express_1.default)();
// Middlewares
server.use((0, cors_1.default)()); // Enable CORS for any website
server.use((0, express_fileupload_1.default)());
server.use(express_1.default.json());
// Set the folder of index.html:
server.use(
  express_1.default.static(posix_1.default.join(__dirname, "./07-Frontend"))
);
// Routes
server.use("/api/auth", auth_controller_1.default);
server.use("/api/vacations/", vacation_controller_1.default);
// Will catch all situations when page not found
server.use("*", function (request, response, next) {
  // const error = new ClientError(404, "Route not found");
  // Will jump to the Catch-All Middleware
  // next(error);
  // Send back index.html on any rout-not-found:(SPA behavior)
  response.sendFile(
    posix_1.default.join(__dirname, "./07-Frontend/index.html")
  );
});
//Error middleware
server.use(errors_handler_1.default);
server.listen(config_1.default.port, function () {
  return console.log("Listening...");
});
