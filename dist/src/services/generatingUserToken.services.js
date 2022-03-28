"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatingUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = {
    secret: "my_random_secret_key",
    expiresIn: "1h",
};
const generatingUserToken = (user) => {
    const token = jsonwebtoken_1.default.sign(user, config.secret, { expiresIn: config.expiresIn });
    return token;
};
exports.generatingUserToken = generatingUserToken;
