"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const conditionsController_1 = require("../controllers/conditionsController");
router.route('/').get(conditionsController_1.getAllConditions).post(conditionsController_1.createCondition);
router.route('/:id').delete(conditionsController_1.deleteCondition);
exports.default = router;
