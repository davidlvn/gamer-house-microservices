"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var authenticationRoutes_1 = __importDefault(require("../routes/authenticationRoutes"));
var constants_1 = require("../constants");
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
    app.use(cors_1.default({ origin: constants_1.DEFAULT_APP_URL, credentials: true }));
    // Backend endpoints
    app.use('/authentication', authenticationRoutes_1.default);
    app.use('/comment', authenticationMiddleware_1.default, postCommentRoutes_1.default);
    app.use('/games', authenticationMiddleware_1.default, gameRoutes_1.default);
    app.use('/gamers', authenticationMiddleware_1.default, gamerRoutes_1.default);
    app.use('/posts', authenticationMiddleware_1.default, postRoutes_1.default);
    app.use('/postTags', authenticationMiddleware_1.default, postTagRoutes_1.default);
    app.use('/groups', authenticationMiddleware_1.default, groupRoutes_1.default);
    return app;
}
exports.createServer = createServer;
