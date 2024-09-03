"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomError extends Error {
    constructor(message, statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message);
        this.statusCode = statusCode;
    }
}
const errorHandlerMiddleware = (err, _, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || 'Something went wrong, try again later';
    res.status(statusCode).json({ msg });
    next();
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
