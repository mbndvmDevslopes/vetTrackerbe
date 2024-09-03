"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dogsConditionsController_1 = require("../controllers/dogsConditionsController");
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = require("zod");
const router = express_1.default.Router({ mergeParams: true });
router
    .route('/')
    .patch((0, zod_express_middleware_1.validateRequest)({
    params: zod_1.z.object({
        dogId: zod_1.z.string(),
    }),
    body: zod_1.z.object({
        conditionIds: zod_1.z.array(zod_1.z.string()), //array
    }),
}), dogsConditionsController_1.updateDogConditions)
    .delete((0, zod_express_middleware_1.validateRequest)({
    params: zod_1.z.object({
        dogId: zod_1.z.string(),
    }),
}), dogsConditionsController_1.deleteAllDogsConditions);
router
    .route('/')
    .get(dogsConditionsController_1.getDogsConditions)
    .post((0, zod_express_middleware_1.validateRequest)({
    params: zod_1.z.object({
        dogId: zod_1.z.string(),
    }),
}), dogsConditionsController_1.createDogsConditions);
exports.default = router;
