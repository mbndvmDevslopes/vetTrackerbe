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
exports.createDogsConditions = exports.deleteAllDogsConditions = exports.updateDogConditions = exports.getDogsConditions = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const getDogsConditions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dogId } = req.params;
    try {
        const dogsConditions = yield prisma.dogsConditions.findMany({
            where: {
                dogId,
            },
        });
        return res.json(dogsConditions);
    }
    catch (error) {
        console.error('Error retrieving dogsConditions:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getDogsConditions = getDogsConditions;
const updateDogConditions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dogId } = req.params;
    const { conditionIds } = req.body;
    const existingDog = yield prisma.dogs.findUnique({
        where: {
            id: dogId,
        },
    });
    if (!existingDog) {
        return res
            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
            .json({ msg: 'dog does not exist' });
    }
    yield prisma.dogsConditions.deleteMany({
        where: {
            dogId,
        },
    });
    const dogsConditionsData = conditionIds.map((conditionId) => ({
        dogId,
        conditionId,
    }));
    const createdDogsConditions = yield prisma.$transaction(dogsConditionsData.map((data) => prisma.dogsConditions.create({ data })));
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: 'dog conditions updated', createdDogsConditions });
});
exports.updateDogConditions = updateDogConditions;
const deleteAllDogsConditions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dogId } = req.params;
    yield prisma.dogsConditions.deleteMany({
        where: {
            dogId: dogId,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'dogsConditions deleted for dog' });
});
exports.deleteAllDogsConditions = deleteAllDogsConditions;
const createDogsConditions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dogId } = req.params;
    const conditionIds = req.body.selectedConditions;
    const createMany = conditionIds.map((conditionId) => ({
        conditionId,
        dogId,
    }));
    const createdDogsConditions = yield prisma.$transaction(createMany.map((data) => prisma.dogsConditions.create({
        data,
    })));
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: 'dog conditions created', createdDogsConditions });
});
exports.createDogsConditions = createDogsConditions;
