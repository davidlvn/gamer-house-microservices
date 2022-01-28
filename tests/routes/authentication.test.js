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
var gamerController_1 = require("../../controllers/gamerController");
var createServer_1 = require("../../server/createServer");
var authenticationService_1 = require("../../services/authenticationService");
var DEV_DB_CONNECTION_STRING = process.env.DEV_DB_CONNECTION_STRING;
if (!DEV_DB_CONNECTION_STRING) {
    throw new Error('DEV_DB_CONNECTION_STRING is not defined');
}
beforeEach(function (done) {
    mongoose_1.default.connect(DEV_DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, function () { return done(); });
});
afterEach(function (done) {
    mongoose_1.default.connection.db.dropDatabase(function () {
        mongoose_1.default.connection.close(function () { return done(); });
    });
});
var app = createServer_1.createServer();
describe('GET/ isAuthenticated', function () {
    it('should respond with an error 500 with no AccessToken in the authorization header', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app).get('/authentication/isAuthenticated').expect(500)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with false with a bad jwt', function () { return __awaiter(void 0, void 0, void 0, function () {
        var badJWT;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    badJWT = 'Oh, a bad json web token!';
                    return [4 /*yield*/, supertest_1.default(app)
                            .get('/authentication/isAuthenticated')
                            .set('Authorization', "AccessToken " + badJWT)
                            .expect(200)
                            .expect('false')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with true with a good jwt', function () { return __awaiter(void 0, void 0, void 0, function () {
        var goodJWT;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    goodJWT = authenticationService_1.generateJWT({ id: 'un id', pseudo: 'un pseudo' });
                    return [4 /*yield*/, supertest_1.default(app)
                            .get('/authentication/isAuthenticated')
                            .set('Authorization', "AccessToken " + goodJWT)
                            .expect(200)
                            .expect('true')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('POST/ login', function () {
    it('should respond with an error 500 an invalid email or password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidMail, invalidPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidMail = {
                        email: 'toto',
                        password: 'Password0',
                    };
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/authentication/login')
                            .send(invalidMail)
                            .expect(422)
                            .expect(['This email is not valid'])];
                case 1:
                    _a.sent();
                    invalidPassword = {
                        email: 'toto@email.com',
                        password: 'Password',
                    };
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/authentication/login')
                            .send(invalidPassword)
                            .expect(422)
                            .expect(['This password is not valid'])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with an error 500 with an unregistered email', function () { return __awaiter(void 0, void 0, void 0, function () {
        var unregisteredMail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    unregisteredMail = {
                        email: 'unregistered@email.com',
                        password: 'Password0',
                    };
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/authentication/login')
                            .send(unregisteredMail)
                            .expect(500)
                            .expect("The gamer could not be logged")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with an error 500 with a registered email but wrong password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var gamer, wrongPassword;
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
                    wrongPassword = {
                        email: 'registered@email.com',
                        password: 'Password1',
                    };
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/authentication/login')
                            .send(wrongPassword)
                            .expect(500)
                            .expect('The gamer could not be logged')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with a valid jwt with valid log in data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var gamer, validLogIn, resp, jwt, expectedPlayload, jwtPlayload;
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
                    validLogIn = {
                        email: 'registered@email.com',
                        password: 'Password0',
                    };
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/authentication/login')
                            .send(validLogIn)
                            .expect(200)];
                case 2:
                    resp = _a.sent();
                    jwt = resp.body.accessToken;
                    expect(authenticationService_1.isValidJWT(jwt)).toBe(true);
                    expectedPlayload = {
                        id: gamer.id,
                        pseudo: gamer.pseudo,
                    };
                    jwtPlayload = authenticationService_1.getPayload(jwt);
                    expect(jwtPlayload).toStrictEqual(expectedPlayload);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('POST/ register', function () {
    it('should respond with an error 500 for an invalid email', function () { return __awaiter(void 0, void 0, void 0, function () {
        var gamerArgs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gamerArgs = {
                        email: 'toto',
                        password: 'Password0',
                        confirmPassword: 'Password0',
                        pseudo: 'pseudo',
                        birthDate: '1999-01-01',
                    };
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/authentication/register')
                            .send(gamerArgs)
                            .expect(422)
                            .expect(['This email is not valid'])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with an error 500 for an invalid password or not the same confirmPassword', function () { return __awaiter(void 0, void 0, void 0, function () {
        var gamerArgs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gamerArgs = {
                        email: 'good@mail.com',
                        password: 'Password',
                        confirmPassword: 'Password',
                        pseudo: 'pseudo',
                        birthDate: '1999-01-01',
                    };
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/authentication/register')
                            .send(gamerArgs)
                            .expect(422)
                            .expect(['This password is not valid'])];
                case 1:
                    _a.sent();
                    gamerArgs.password = 'Password0';
                    gamerArgs.confirmPassword = 'anotherPassword';
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/authentication/register')
                            .send(gamerArgs)
                            .expect(422)
                            .expect(['The passwords do not match'])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with an error 500 for an invalid pseudo', function () { return __awaiter(void 0, void 0, void 0, function () {
        var gamerArgs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gamerArgs = {
                        email: 'good@mail.com',
                        password: 'Password0',
                        confirmPassword: 'Password0',
                        pseudo: 'ps',
                        birthDate: '1999-01-01',
                    };
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/authentication/register')
                            .send(gamerArgs)
                            .expect(422)
                            .expect(['This pseudo is not valid'])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with an error 500 for an invalid birthdate', function () { return __awaiter(void 0, void 0, void 0, function () {
        var gamerArgs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gamerArgs = {
                        email: 'good@mail.com',
                        password: 'Password0',
                        confirmPassword: 'Password0',
                        pseudo: 'pseudo',
                        birthDate: '',
                    };
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/authentication/register')
                            .send(gamerArgs)
                            .expect(422)
                            .expect([
                            'Incorrect date format',
                            'Incorrect date',
                            'You must be at least 18 to create an account',
                        ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with a valid jwt with valid log in data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var gamerArgs, resp, jwt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gamerArgs = {
                        email: 'good@mail.com',
                        password: 'Password0',
                        confirmPassword: 'Password0',
                        pseudo: 'pseudo',
                        birthDate: '1999-01-01',
                    };
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/authentication/register')
                            .send(gamerArgs)
                            .expect(200)];
                case 1:
                    resp = _a.sent();
                    jwt = resp.body.accessToken;
                    expect(authenticationService_1.isValidJWT(jwt)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
