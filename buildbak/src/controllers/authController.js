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
exports.logout = exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const passwordUtils_1 = require("../../utils/passwordUtils");
const tokenUtils_1 = require("../../utils/tokenUtils");
const customError_1 = require("../../errors/customError");
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const isFirstAccount = (yield prisma.users.count()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    const hashedPassword = yield (0, passwordUtils_1.hashPassword)(data.password);
    data.password = hashedPassword;
    yield prisma.users.create({
        data,
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: 'user created' });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = yield prisma.users.findUnique({
        where: {
            email: data.email,
        },
    });
    const isValidUser = user && (yield (0, passwordUtils_1.comparePassword)(data.password, user.password));
    if (!isValidUser)
        throw new customError_1.UnauthenticatedError('invalid credentials');
    const token = (0, tokenUtils_1.createJWT)({ userId: user.id, role: user.role });
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: true,
        sameSite: 'none',
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'user logged in' });
});
exports.login = login;
const logout = (_, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'user logged out' });
};
exports.logout = logout;
