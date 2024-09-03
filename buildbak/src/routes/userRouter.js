"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = require("zod");
const router = express.Router();
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../../middleware/authMiddleware");
router.get('/current-user', userController_1.getCurrentUser);
router.get('/admin/all-users', [(0, authMiddleware_1.authorizePermissions)('admin'), userController_1.allUsers]);
router.patch('/update-user', (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
    }),
}), userController_1.updateUser);
exports.default = router;
