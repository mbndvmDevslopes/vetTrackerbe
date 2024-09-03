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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = exports.authenticateUser = void 0;
const tokenUtils_1 = require("../utils/tokenUtils");
const customError_1 = require("../errors/customError");
const authenticateUser = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token) {
        throw new customError_1.UnauthenticatedError('authentication invalid');
    }
    try {
        const { userId, role } = (0, tokenUtils_1.verifyJWT)(token);
        req.user = { userId, role };
        next();
    }
    catch (error) {
        throw new customError_1.UnauthenticatedError('authentication invalid');
    }
});
exports.authenticateUser = authenticateUser;
const authorizePermissions = (...role) => {
    return (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user && role.includes(req.user.role)) {
            next();
            return;
        }
        throw new customError_1.UnauthorizedError('unauthorized');
    });
};
exports.authorizePermissions = authorizePermissions;
