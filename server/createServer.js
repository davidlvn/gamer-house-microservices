"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var healthRoutes_1 = __importDefault(require("../routes/healthRoutes"));
var gamerRoutes_1 = __importDefault(require("../routes/gamerRoutes"));
/** Create express app and open backend endpoints */
function createServer() {
    var app = express_1.default();
    app
        .use(body_parser_1.default.json({ limit: '5MB' }))
        .use(body_parser_1.default.urlencoded({ limit: '5MB', extended: true }));
    // Backend endpoints
    app.use('/health', healthRoutes_1.default);
    app.use('/gamers', gamerRoutes_1.default);
    return app;
}
exports.createServer = createServer;
