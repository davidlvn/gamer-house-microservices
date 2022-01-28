"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordArgumentsValidator = exports.loginGamerArgumentsValidator = exports.registerGamerArgumentsValidator = void 0;
var express_validator_1 = require("express-validator");
var MINIMUM_AGE = 18;
var MINIMUM_DATE = '1900-01-01';
var MAXIMUM_DATE = new Date().getFullYear() - MINIMUM_AGE + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
var registerGamerArgumentsValidator = function () { return [
    express_validator_1.body('email', 'This email is not valid').isEmail(),
    express_validator_1.check('confirmPassword', 'The passwords do not match').custom(function (value, _a) {
        var req = _a.req;
        return value === req.body.password;
    }),
    express_validator_1.body('password', 'This password is not valid').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i'),
    express_validator_1.body('pseudo', 'This pseudo is not valid').isLength({ min: 5 }),
    express_validator_1.body('birthDate')
        .isDate()
        .withMessage('Incorrect date format')
        .isAfter(MINIMUM_DATE)
        .withMessage('Incorrect date')
        .isBefore(MAXIMUM_DATE)
        .withMessage('You must be at least 18 to create an account: ' + MAXIMUM_DATE),
]; };
exports.registerGamerArgumentsValidator = registerGamerArgumentsValidator;
var loginGamerArgumentsValidator = function () { return [
    express_validator_1.body('email', 'This email is not valid').isEmail(),
    express_validator_1.body('password', 'This password is not valid').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i'),
]; };
exports.loginGamerArgumentsValidator = loginGamerArgumentsValidator;
var changePasswordArgumentsValidator = function () { return [
    express_validator_1.body('password', 'This password is not valid').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i'),
]; };
exports.changePasswordArgumentsValidator = changePasswordArgumentsValidator;
