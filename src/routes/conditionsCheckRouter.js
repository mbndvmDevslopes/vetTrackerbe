"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const conditionsCheckController_1 = require("../controllers/conditionsCheckController");
router.get('/:id', conditionsCheckController_1.checkConditionUsage);
exports.default = router;
