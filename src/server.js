"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
// import * as dotenv from 'dotenv';
require("dotenv/config");
// dotenv.config();
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//routers
const dogRouter_1 = __importDefault(require("./routes/dogRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
//Middleware
const errorHandlerMiddleware_1 = require("../middleware/errorHandlerMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const conditionsRouter_1 = __importDefault(require("./routes/conditionsRouter"));
const conditionsCheckRouter_1 = __importDefault(require("./routes/conditionsCheckRouter"));
const path_1 = __importDefault(require("path"));
app.use(express_1.default.static(path_1.default.resolve(__dirname, './public')));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use('/api/dogs', authMiddleware_1.authenticateUser, dogRouter_1.default);
app.use('/api/user', authMiddleware_1.authenticateUser, userRouter_1.default);
app.use('/api/auth', authRouter_1.default);
app.use('/api/conditions', authMiddleware_1.authenticateUser, conditionsRouter_1.default);
app.use('/api/checkUsage', authMiddleware_1.authenticateUser, conditionsCheckRouter_1.default);
app.get('*', (_, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../public', 'index.html'));
});
// app.get('*', (_, res) => {
//   res.redirect('https://vettracker.onrender.com');
// });
//NOT FOUND ROUTE MIDDLEWARE
app.use('*', (_, res) => {
    res.status(404).json({ msg: 'not found' });
});
app.use(errorHandlerMiddleware_1.errorHandlerMiddleware);
const port = process.env.PORT || 5100;
app.listen(port, () => console.log(`Server running on port ${port}`));
