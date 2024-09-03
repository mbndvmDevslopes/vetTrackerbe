"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const authController_1 = require("../controllers/authController");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { msg: 'IP rate limit exceeded,retry in 15 minutes' },
});
router.post('/register', apiLimiter, (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
}), authController_1.register);
router.post('/login', apiLimiter, (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
}), authController_1.login);
router.get('/logout', authController_1.logout);
exports.default = router;
