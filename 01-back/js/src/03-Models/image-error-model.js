"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageError = /** @class */ (function () {
    function ImageError(status, message, date) {
        this.status = status;
        this.message = message;
        this.date = date;
    }
    return ImageError;
}());
exports.default = ImageError;
