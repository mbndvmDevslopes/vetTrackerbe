"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const dogController_1 = require("../controllers/dogController");
const dogsConditionsRouter_1 = __importDefault(require("./dogsConditionsRouter"));
router.use('/:dogId/dogsConditions', dogsConditionsRouter_1.default);
router
    .route('/')
    .get(dogController_1.getAllDogs)
    .post((0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        breed: zod_1.z.string(),
        sex: zod_1.z.string(),
        birthDate: zod_1.z.string(),
        weight: zod_1.z.number(),
        isActive: zod_1.z.boolean(),
        dateVisited: zod_1.z.string(),
        notes: zod_1.z.string().optional(),
        updatedAt: zod_1.z.string(),
        ownerName: zod_1.z.string(),
    }),
}), dogController_1.createDog);
router
    .route('/:id')
    .get((0, zod_express_middleware_1.validateRequest)({
    params: zod_1.z.object({ id: zod_1.z.string() }),
}), dogController_1.getDog)
    .patch((0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        breed: zod_1.z.string(),
        sex: zod_1.z.string(),
        birthDate: zod_1.z.string(),
        weight: zod_1.z.number(),
        isActive: zod_1.z.boolean(),
        dateVisited: zod_1.z.string(),
        notes: zod_1.z.string().optional(),
        ownerName: zod_1.z.string(),
    }),
}), (0, zod_express_middleware_1.validateRequest)({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
}), dogController_1.editDog)
    .delete(dogController_1.deleteDog);
router.route('/:id/activeStatus').patch(dogController_1.editDogActiveStatus);
exports.default = router;
