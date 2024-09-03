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
exports.deleteCondition = exports.createCondition = exports.getAllConditions = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const getAllConditions = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dogs = yield prisma.conditions.findMany();
    res.send(dogs);
});
exports.getAllConditions = getAllConditions;
const createCondition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const newCondition = yield prisma.conditions.create({
        data,
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: 'data received', newCondition });
});
exports.createCondition = createCondition;
const deleteCondition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const condition = yield prisma.conditions.delete({
        where: {
            id: id,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'condition deleted', condition });
});
exports.deleteCondition = deleteCondition;
