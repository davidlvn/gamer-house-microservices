"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var authenticationRoutes_1 = __importDefault(require("../routes/authenticationRoutes"));
var healthRoutes_1 = __importDefault(require("../routes/healthRoutes"));
/** Create express app and open backend endpoints */
function createServer() {
    var app = express_1.default();
    app
        .use(body_parser_1.default.json({ limit: '5MB' }))
        .use(body_parser_1.default.urlencoded({ limit: '5MB', extended: true }));
    // Backend endpoints
    app.use('/authentication', authenticationRoutes_1.default);
    app.use('/health', healthRoutes_1.default);
    return app;
}
exports.createServer = createServer;
