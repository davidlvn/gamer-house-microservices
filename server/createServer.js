"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var authenticationRoutes_1 = __importDefault(require("../routes/authenticationRoutes"));
var constants_1 = require("../constants");
var healthRoutes_1 = __importDefault(require("../routes/healthRoutes"));
var gamerRoutes_1 = __importDefault(require("../routes/gamerRoutes"));
var authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
var postRoutes_1 = __importDefault(require("../routes/postRoutes"));
var postTagRoutes_1 = __importDefault(require("../routes/postTagRoutes"));
var postCommentRoutes_1 = __importDefault(require("../routes/postCommentRoutes"));
var groupRoutes_1 = __importDefault(require("../routes/groupRoutes"));
var gameRoutes_1 = __importDefault(require("../routes/gameRoutes"));
/** Create express app and open backend endpoints */
function createServer() {
    var app = express_1.default();
    app
        .use(body_parser_1.default.json({ limit: '5MB' }))
        .use(body_parser_1.default.urlencoded({ limit: '5MB', extended: true }));
    // Backend endpoints
    app.use('/authentication', authenticationRoutes_1.default);
    app.use('/health', healthRoutes_1.default);
    app.use('/comment', postCommentRoutes_1.default);
    app.use('/games', gameRoutes_1.default);
    app.use('/gamers', gamerRoutes_1.default);
    app.use('/posts', postRoutes_1.default);
    app.use('/postTags', postTagRoutes_1.default);
    app.use('/groups', groupRoutes_1.default);
    return app;
}
exports.createServer = createServer;
