"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var express_validator_1 = require("express-validator");
function validate(req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (errors.isEmpty())
        return next();
    return res.status(422).json(errors.array().map(function (error) { return error.msg; }));
}
exports.validate = validate;
