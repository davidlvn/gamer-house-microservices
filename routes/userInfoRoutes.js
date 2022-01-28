"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authenticationService_1 = require("../services/authenticationService");
var userInfoRouter = express_1.default();
userInfoRouter.get('/pseudo', function (req, res) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(500).json('No authorization header');
    }
    var accessToken = authorization.replace('AccessToken ', '');
    if (!accessToken) {
        return res.status(500).send('No access token');
    }
    var playload = authenticationService_1.getPayload(accessToken);
    return res.status(200).json({ pseudo: playload.pseudo });
});
exports.default = userInfoRouter;
