"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
exports.database = [];
const routes = (app) => {
    app.use(express_1.default.json());
    (0, user_route_1.default)(app);
};
exports.default = routes;
