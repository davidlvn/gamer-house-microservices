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
var mongoose_1 = __importDefault(require("mongoose"));
var supertest_1 = __importDefault(require("supertest"));
var gameController_1 = require("../../controllers/gameController");
var gamerController_1 = require("../../controllers/gamerController");
var createServer_1 = require("../../server/createServer");
var authenticationService_1 = require("../../services/authenticationService");
var DEV_DB_CONNECTION_STRING = process.env.DEV_DB_CONNECTION_STRING;
if (!DEV_DB_CONNECTION_STRING) {
    throw new Error('DEV_DB_CONNECTION_STRING is not defined');
}
var gamer;
var jwt;
beforeEach(function (done) {
    mongoose_1.default.connect(DEV_DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gamerController_1.createGamer({
                        email: 'registered@email.com',
                        password: 'Password0',
                        pseudo: 'pseudo',
                        birthDate: new Date('1999-01-01'),
                    })];
                case 1:
                    gamer = _a.sent();
                    jwt = authenticationService_1.generateJWT({ id: gamer.id, pseudo: gamer.pseudo });
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
afterEach(function (done) {
    mongoose_1.default.connection.db.dropDatabase(function () {
        mongoose_1.default.connection.close(function () { return done(); });
    });
});
var app = createServer_1.createServer();
describe('Routes games/', function () {
    it('should respond with an error 500 with a no authenticated user', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app).post('/games/').expect(500)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app).get('/games/').expect(500)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app).put('/games/').expect(500)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('POST games/', function () {
    it('should respond with an error because of empty name', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app)
                        .post('/games')
                        .set('Authorization', "AccessToken " + jwt)
                        .send({
                        name: '',
                        picture: 'https://img.icons8.com/color/452/rocket-league.png',
                    })
                        .expect(500)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with an error because of empty picture', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app)
                        .post('/games')
                        .set('Authorization', "AccessToken " + jwt)
                        .send({
                        name: 'Test',
                        picture: '',
                    })
                        .expect(500)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create the corresponding game', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app)
                        .post('/games')
                        .set('Authorization', "AccessToken " + jwt)
                        .send({
                        name: 'Rocket League',
                        picture: 'https://img.icons8.com/color/452/rocket-league.png',
                    })
                        .expect(201)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('PUT games/', function () {
    it('should add the corresponding game to gamer', function () { return __awaiter(void 0, void 0, void 0, function () {
        var game;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gameController_1.createGame({
                        name: 'League of Legends',
                        picture: 'https://www.esportsbets.com/wp-content/uploads/2018/01/lol_client_logo.png',
                    })];
                case 1:
                    game = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app)
                            .put('/games')
                            .set('Authorization', "AccessToken " + jwt)
                            .send({ gameWithRank: { game: game._id, rank: 'Iron IV' } })
                            .expect(201)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('DELETE games/', function () {
    it('should respond with an error removing inexisting game from gamer games list', function () { return __awaiter(void 0, void 0, void 0, function () {
        var game;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gameController_1.createGame({
                        name: 'League of Legends',
                        picture: 'https://www.esportsbets.com/wp-content/uploads/2018/01/lol_client_logo.png',
                    })];
                case 1:
                    game = _a.sent();
                    return [4 /*yield*/, gameController_1.addGameToGamer(gamer.id, { game: game._id, rank: 'Iron IV' })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app)
                            .delete('/games/60c51a1367ed962d74e30000')
                            .set('Authorization', "AccessToken " + jwt)
                            .send()
                            .expect(201)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should remove the corresponding game from gamer games list', function () { return __awaiter(void 0, void 0, void 0, function () {
        var game;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gameController_1.createGame({
                        name: 'League of Legends',
                        picture: 'https://www.esportsbets.com/wp-content/uploads/2018/01/lol_client_logo.png',
                    })];
                case 1:
                    game = _a.sent();
                    return [4 /*yield*/, gameController_1.addGameToGamer(gamer.id, { game: game._id, rank: 'Iron IV' })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app)
                            .delete("/games/" + game._id)
                            .set('Authorization', "AccessToken " + jwt)
                            .send()
                            .expect(201)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
