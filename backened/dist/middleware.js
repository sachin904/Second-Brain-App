"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = userMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function userMiddleware(req, res, next) {
    const header = req.headers["authorization"];
    console.log(header);
    const decode = jsonwebtoken_1.default.verify(header, config_1.JWT_SECRET);
    if (decode) {
        if (typeof decode === "string") {
            res.status(403).json({
                mgs: "you are not logged in "
            });
        }
        req.userId = decode.id;
        next();
    }
    else {
        res.status(403).json({
            msg: "you are not logged in"
        });
    }
}
