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
exports.allUsers = exports.updateUser = exports.getStats = exports.getCurrentUser = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const passwordUtils_1 = require("../../utils/passwordUtils");
const prisma = new client_1.PrismaClient();
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userFromDb = yield prisma.users.findUnique({
        where: {
            id: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId) || undefined,
        },
    });
    const loggedInUserWithoutPassword = (0, passwordUtils_1.excludePassword)(userFromDb, [
        'password',
    ]);
    res.status(http_status_codes_1.StatusCodes.OK).json({ loggedInUserWithoutPassword });
});
exports.getCurrentUser = getCurrentUser;
//This to be implemented in the future
const getStats = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.users.count();
    const dogs = yield prisma.dogs.count();
    res.status(http_status_codes_1.StatusCodes.OK).json({ users, dogs });
});
exports.getStats = getStats;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newUser = Object.assign({}, req.body);
    delete newUser.password;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const data = newUser;
    yield prisma.users.update({
        where: {
            id: id,
        },
        data,
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'user updated' });
});
exports.updateUser = updateUser;
const allUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.users.findMany({
        select: {
            email: true,
            firstName: true,
            lastName: true,
            role: true,
        }
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(users);
});
exports.allUsers = allUsers;
