"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginIn = exports.createUser = void 0;
const serializingUser_services_1 = __importDefault(require("../services/serializingUser.services"));
const routes_1 = require("../routes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generatingUserToken_services_1 = require("../services/generatingUserToken.services");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = yield (0, serializingUser_services_1.default)(data);
    routes_1.database.push(user);
    const { password } = user, userSerialized = __rest(user, ["password"]);
    res.status(201).json(userSerialized);
});
exports.createUser = createUser;
const loginIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = routes_1.database.find((userDb) => userDb.username === username);
    if (!user) {
        return res.status(401).json({
            message: "Wrong credentials. Try again!"
        });
    }
    if (user) {
        const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
        if (passwordMatches) {
            const token = (0, generatingUserToken_services_1.generatingUserToken)(user);
            return res.status(200).json({ accessToken: token });
        }
        return res.status(401).json({
            message: "Wrong credentials. Try again!"
        });
    }
});
exports.loginIn = loginIn;
