"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatingUserExistence = void 0;
const routes_1 = require("../routes");
const validatingUserExistence = (req, res, next) => {
    const { username } = req.body;
    const userExists = routes_1.database.find((userDb) => userDb.username === username);
    const endPoint = req.originalUrl;
    if (userExists) {
        if (endPoint === "/user/login") {
            return next();
        }
        else {
            return res.status(422).json({ message: "You can not use this username." });
        }
    }
    else {
        next();
    }
};
exports.validatingUserExistence = validatingUserExistence;
