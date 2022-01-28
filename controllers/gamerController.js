"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.hashPassword = exports.getGamersByPseudo = exports.unfollowGamer = exports.followGamer = exports.changeAvatar = exports.changePassword = exports.updateGamer = exports.deleteGamer = exports.getGamerByEmail = exports.getGamer = exports.getGamers = exports.createGamer = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var gamerModel_1 = require("../models/gamerModel");
function createGamer(args) {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.hashPassword(args.password)];
                case 1:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, gamerModel_1.createGamerDB(__assign(__assign({}, args), { password: hashedPassword, createdAt: new Date() }))];
                case 2:
                    gamer = _a.sent();
                    return [2 /*return*/, gamer];
            }
        });
    });
}
exports.createGamer = createGamer;
function getGamers() {
    return __awaiter(this, void 0, void 0, function () {
        var gamers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gamerModel_1.getGamersDB()];
                case 1:
                    gamers = _a.sent();
                    return [2 /*return*/, gamers];
            }
        });
    });
}
exports.getGamers = getGamers;
function getGamer(id) {
    return __awaiter(this, void 0, void 0, function () {
        var gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gamerModel_1.getGamerDB(id)];
                case 1:
                    gamer = _a.sent();
                    if (!gamer)
                        throw new Error('The requested gamer does not exist');
                    return [2 /*return*/, gamer];
            }
        });
    });
}
exports.getGamer = getGamer;
function getGamerByEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gamerModel_1.getGamerByEmailDB(email)];
                case 1:
                    gamer = _a.sent();
                    if (!gamer)
                        throw new Error('The requested gamer does not exist');
                    return [2 /*return*/, gamer];
            }
        });
    });
}
exports.getGamerByEmail = getGamerByEmail;
function deleteGamer(id) {
    return __awaiter(this, void 0, void 0, function () {
        var gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gamerModel_1.deleteGamerDB(id)];
                case 1:
                    gamer = _a.sent();
                    if (!gamer)
                        throw new Error('The requested gamer does not exist');
                    return [2 /*return*/, gamer];
            }
        });
    });
}
exports.deleteGamer = deleteGamer;
function updateGamer(id, args) {
    return __awaiter(this, void 0, void 0, function () {
        var gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (args.email != null && !regexEmail.test(args.email)) {
                        throw new Error('This email is not valid');
                    }
                    return [4 /*yield*/, gamerModel_1.updateGamerDB(id, args)];
                case 1:
                    gamer = _a.sent();
                    if (!gamer)
                        throw new Error('The requested gamer does not exist');
                    return [2 /*return*/, gamer];
            }
        });
    });
}
exports.updateGamer = updateGamer;
function changePassword(id, password) {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.hashPassword(password)];
                case 1:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, gamerModel_1.changePasswordDB(id, hashedPassword)];
                case 2:
                    gamer = _a.sent();
                    if (!gamer)
                        throw new Error('The requested gamer does not exist');
                    return [2 /*return*/, gamer];
            }
        });
    });
}
exports.changePassword = changePassword;
function changeAvatar(id, avatar) {
    return __awaiter(this, void 0, void 0, function () {
        var gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gamerModel_1.changeAvatarDB(id, avatar)];
                case 1:
                    gamer = _a.sent();
                    if (!gamer)
                        throw new Error('The requested gamer does not exist');
                    return [2 /*return*/, gamer];
            }
        });
    });
}
exports.changeAvatar = changeAvatar;
function followGamer(id, idToFollow) {
    return __awaiter(this, void 0, void 0, function () {
        var gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getGamer(idToFollow)];
                case 1:
                    _a.sent(); // checks if the gamer to follow exists
                    return [4 /*yield*/, isFollowable(id, idToFollow)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, gamerModel_1.addToFollowingDB(id, idToFollow)];
                case 3:
                    gamer = _a.sent();
                    if (!gamer)
                        throw new Error('The requested gamer does not exist');
                    return [4 /*yield*/, gamerModel_1.addToFollowersDB(idToFollow, id)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, gamer];
            }
        });
    });
}
exports.followGamer = followGamer;
function unfollowGamer(id, idToUnfollow) {
    return __awaiter(this, void 0, void 0, function () {
        var gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gamerModel_1.deleteFromFollowingDB(id, idToUnfollow)];
                case 1:
                    gamer = _a.sent();
                    if (!gamer)
                        throw new Error('The requested gamer does not exist');
                    return [4 /*yield*/, gamerModel_1.deleteFromFollowersDB(idToUnfollow, id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, gamer];
            }
        });
    });
}
exports.unfollowGamer = unfollowGamer;
function getGamersByPseudo(userId, pseudo) {
    return __awaiter(this, void 0, void 0, function () {
        var gamers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gamerModel_1.getGamersByPseudoDB(userId, pseudo)];
                case 1:
                    gamers = _a.sent();
                    if (!gamers)
                        throw new Error('The requested gamers do not exist');
                    return [2 /*return*/, gamers];
            }
        });
    });
}
exports.getGamersByPseudo = getGamersByPseudo;
var isFollowable = function (id, idToFollow) { return __awaiter(void 0, void 0, void 0, function () {
    var gamer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (id === idToFollow) {
                    throw new Error("One can't follow themselves");
                }
                return [4 /*yield*/, getGamer(id)];
            case 1:
                gamer = _a.sent();
                if (gamer.following.find(function (followedGamer) { return followedGamer.id === idToFollow; })) {
                    throw new Error('The gamer is already being followed');
                }
                return [2 /*return*/];
        }
    });
}); };
var regexEmail = new RegExp('[a-zA-Z0-9]*[^@]@{1}[a-zA-Z0-9]*[.][a-zA-Z]+');
var hashPassword = function (password) {
    return bcrypt_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
