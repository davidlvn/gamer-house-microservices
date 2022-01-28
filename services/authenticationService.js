"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayload = exports.isValidJWT = exports.generateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var constants_1 = require("../constants");
function generateJWT(data) {
    return jsonwebtoken_1.default.sign(data, constants_1.SECRET_ACCESS_TOKEN, { expiresIn: 60 * 60 });
}
exports.generateJWT = generateJWT;
function isValidJWT(jwt) {
    try {
        jsonwebtoken_1.default.verify(jwt, constants_1.SECRET_ACCESS_TOKEN);
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.isValidJWT = isValidJWT;
function getPayload(jwt) {
    var fullPayload = jsonwebtoken_1.default.verify(jwt, constants_1.SECRET_ACCESS_TOKEN);
    var jwtPayload = Object.entries(fullPayload).reduce(function (prev, curr) {
        var key = curr[0];
        if (key !== 'exp' && key !== 'iat') {
            prev[key] = curr[1];
        }
        return prev;
    }, { id: '', pseudo: '' });
    return jwtPayload;
}
exports.getPayload = getPayload;
