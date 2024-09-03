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
exports.deleteDog = exports.editDogActiveStatus = exports.editDog = exports.getDog = exports.createDog = exports.getAllDogs = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const getAllDogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const dogs = yield prisma.dogs.findMany({
        where: {
            vetId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
        },
    });
    res.send(dogs);
});
exports.getAllDogs = getAllDogs;
const createDog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body.vetId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const data = req.body;
    const newDog = yield prisma.dogs.create({
        data,
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: 'data received', newDog });
});
exports.createDog = createDog;
const getDog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const dog = yield prisma.dogs.findUnique({
        where: {
            id: id,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ dog });
});
exports.getDog = getDog;
const editDog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    const editedDog = yield prisma.dogs.update({
        data,
        where: {
            id: id,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'dog updated', editedDog });
});
exports.editDog = editDog;
const editDogActiveStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    const editedDog = yield prisma.dogs.update({
        data,
        where: {
            id: id,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'dog updated', editedDog });
});
exports.editDogActiveStatus = editDogActiveStatus;
const deleteDog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const dog = yield prisma.dogs.delete({
        where: {
            id: id,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'dog deleted', dog });
});
exports.deleteDog = deleteDog;
