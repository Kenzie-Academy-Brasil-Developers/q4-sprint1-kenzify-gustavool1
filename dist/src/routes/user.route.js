"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = __importDefault(require("../middlewares/validate"));
const validatingUserExistence_middleware_1 = require("../middlewares/validatingUserExistence.middleware");
const user_schemas_1 = __importDefault(require("../schemas/user.schemas"));
const routes = (0, express_1.Router)();
const userRoutes = (app) => {
    routes.post("/register", (0, validate_1.default)(user_schemas_1.default), validatingUserExistence_middleware_1.validatingUserExistence, user_controller_1.createUser);
    routes.post("/login", (0, validate_1.default)(user_schemas_1.default), validatingUserExistence_middleware_1.validatingUserExistence, user_controller_1.loginIn);
    app.use("/user", routes);
};
exports.default = userRoutes;
