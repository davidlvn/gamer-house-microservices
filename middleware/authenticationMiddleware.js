"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authenticationService_1 = require("../services/authenticationService");
function mustBeAuthenticated(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(500).json('No authorization header');
    }
    var accessToken = authorization.replace('AccessToken ', '');
    if (!accessToken) {
        return res.status(500).send('No access token');
    }
    if (!authenticationService_1.isValidJWT(accessToken)) {
        return res.status(500).send('No access token');
    }
    req.accessToken = accessToken;
    next();
}
exports.default = mustBeAuthenticated;
