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
var express_1 = require("express");
var bcrypt_1 = __importDefault(require("bcrypt"));
var gamerArgumentsValidator_1 = require("../validators/gamerArgumentsValidator");
var validator_1 = require("../validators/validator");
var gamerController_1 = require("../controllers/gamerController");
var authenticationService_1 = require("../services/authenticationService");
var router = express_1.Router();
// Gamer management
router.post('/', gamerArgumentsValidator_1.registerGamerArgumentsValidator(), validator_1.validate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gamerArgs, gamer, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                gamerArgs = {
                    password: req.body.password,
                    pseudo: req.body.pseudo,
                    email: req.body.email.toLowerCase(),
                    birthDate: req.body.birthDate,
                };
                return [4 /*yield*/, gamerController_1.createGamer(gamerArgs)];
            case 1:
                gamer = _a.sent();
                res.status(201).json(gamer);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(500).json({ error: "The gamer could not be created: " + e_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/getAuthenticatedGamer', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, gamer, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                payload = authenticationService_1.getPayload(req.accessToken);
                return [4 /*yield*/, gamerController_1.getGamer(payload.id)];
            case 1:
                gamer = _a.sent();
                res.status(200).json(gamer);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(500).json({ error: "Could not find any gamer: " + e_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gamers, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, gamerController_1.getGamers()];
            case 1:
                gamers = _a.sent();
                res.status(200).json(gamers);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(500).json({ error: "Could not find any gamer: " + e_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gamer, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, gamerController_1.getGamer(req.params.id)];
            case 1:
                gamer = _a.sent();
                res.status(200).json(gamer);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                res.status(500).json({ error: "The gamer could not be found: " + e_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gamer, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, gamerController_1.deleteGamer(req.params.id)];
            case 1:
                gamer = _a.sent();
                res.status(201).json(gamer);
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                res.status(500).json({ error: "The gamer could not be deleted: " + e_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/update', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, gamer, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                delete req.body.password;
                payload = authenticationService_1.getPayload(req.accessToken);
                return [4 /*yield*/, gamerController_1.updateGamer(payload.id, req.body)];
            case 1:
                gamer = _a.sent();
                res.status(201).json(gamer);
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                res.status(500).json({ error: "The user could not be updated: " + e_6.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.patch('/avatar', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, gamer, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                payload = authenticationService_1.getPayload(req.accessToken);
                return [4 /*yield*/, gamerController_1.changeAvatar(payload.id, req.body.avatarToChange)];
            case 1:
                gamer = _a.sent();
                res.status(201).json(gamer);
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                res.status(500).json({ error: "The avatar could not be updated: " + e_7.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.patch('/password', gamerArgumentsValidator_1.changePasswordArgumentsValidator(), validator_1.validate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, gamer, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                payload = authenticationService_1.getPayload(req.accessToken);
                return [4 /*yield*/, gamerController_1.getGamer(payload.id)];
            case 1:
                gamer = _a.sent();
                if (!bcrypt_1.default.compareSync(req.body.currentPassword, gamer.password)) {
                    throw new Error('The password could not be updated');
                }
                return [4 /*yield*/, gamerController_1.changePassword(payload.id, req.body.password)];
            case 2:
                gamer = _a.sent();
                res.status(201).json(gamer);
                return [3 /*break*/, 4];
            case 3:
                e_8 = _a.sent();
                res.status(500).json({ error: "The password could not be updated: " + e_8.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Search System
router.get('/search/:pseudo', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, gamers, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                payload = authenticationService_1.getPayload(req.accessToken);
                return [4 /*yield*/, gamerController_1.getGamersByPseudo(payload.id, req.params.pseudo)];
            case 1:
                gamers = _a.sent();
                res.status(200).json(gamers);
                return [3 /*break*/, 3];
            case 2:
                e_9 = _a.sent();
                res
                    .status(500)
                    .json({ error: "No gamer using this pseudo could be found: " + e_9.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Following System
router.put('/follow', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, gamer, e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                payload = authenticationService_1.getPayload(req.accessToken);
                return [4 /*yield*/, gamerController_1.followGamer(payload.id, req.body.idToFollow)];
            case 1:
                gamer = _a.sent();
                res.status(201).json(gamer);
                return [3 /*break*/, 3];
            case 2:
                e_10 = _a.sent();
                res.status(500).json({ error: "The gamer could not be followed: " + e_10.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete('/unfollow/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, gamer, e_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                payload = authenticationService_1.getPayload(req.accessToken);
                return [4 /*yield*/, gamerController_1.unfollowGamer(payload.id, req.params.id)];
            case 1:
                gamer = _a.sent();
                res.status(201).json(gamer);
                return [3 /*break*/, 3];
            case 2:
                e_11 = _a.sent();
                res.status(500).json({ error: "The gamer could not be unfollowed: " + e_11.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
