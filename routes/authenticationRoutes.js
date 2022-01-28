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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var gamerController_1 = require("../controllers/gamerController");
var gamerArgumentsValidator_1 = require("../validators/gamerArgumentsValidator");
var validator_1 = require("../validators/validator");
var authenticationService_1 = require("../services/authenticationService");
var authenticationRouter = express_1.default();
authenticationRouter.post('/login', gamerArgumentsValidator_1.loginGamerArgumentsValidator(), validator_1.validate, function (req, res) {
    gamerController_1.getGamerByEmail(req.body.email.toLowerCase())
        .then(function (gamer) {
        if (!bcrypt_1.default.compareSync(req.body.password, gamer.password)) {
            throw Error('Wrong password and email combination');
        }
        var accessToken = authenticationService_1.generateJWT({
            id: gamer.id,
            pseudo: gamer.pseudo,
        });
        res.status(200).json({ accessToken: accessToken });
    })
        .catch(function (e) { return res.status(500).send("The gamer could not be logged"); });
});
authenticationRouter.post('/register', gamerArgumentsValidator_1.registerGamerArgumentsValidator(), validator_1.validate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gamerData;
    return __generator(this, function (_a) {
        gamerData = {
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            pseudo: req.body.pseudo,
            birthDate: new Date(req.body.birthDate),
        };
        gamerController_1.createGamer(gamerData)
            .then(function (gamer) {
            var accessToken = authenticationService_1.generateJWT({ id: gamer.id, pseudo: gamer.pseudo });
            res.status(200).json({ accessToken: accessToken });
        })
            .catch(function (e) { return res.status(500).send("The gamer could not be registered"); });
        return [2 /*return*/];
    });
}); });
authenticationRouter.get('/isAuthenticated', function (req, res) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(500).json('No authorization header');
    }
    var accessToken = authorization.replace('AccessToken ', '');
    if (!accessToken) {
        return res.status(500).send('No access token');
    }
    return res.status(200).send(authenticationService_1.isValidJWT(accessToken));
});
exports.default = authenticationRouter;
