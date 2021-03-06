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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var commentController_1 = require("../controllers/commentController");
var authenticationService_1 = require("../services/authenticationService");
var commentRouter = express_1.Router();
commentRouter.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var writer, commentArgs;
    return __generator(this, function (_a) {
        writer = authenticationService_1.getPayload(req.accessToken).id;
        commentArgs = __assign({ writer: writer }, req.body);
        commentController_1.createComment(commentArgs)
            .then(function (comment) { return res.status(201).json(comment); })
            .catch(function (e) {
            res.status(500).json({ error: "The comment could not be created: " + e.message });
        });
        return [2 /*return*/];
    });
}); });
commentRouter.get('/:id/user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var commentId, comment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                commentId = req.params.id;
                return [4 /*yield*/, commentController_1.getComment(commentId)];
            case 1:
                comment = _a.sent();
                if (!comment) {
                    return [2 /*return*/, res.status(500).json({ error: "The comment was not found" })];
                }
                commentController_1.getCommentWriter(comment)
                    .then(function (commentWritter) { return res.status(200).json({ id: commentWritter.id }); })
                    .catch(function (e) {
                    return res.status(500).json({ error: "The writer was not found: " + e.message });
                });
                return [2 /*return*/];
        }
    });
}); });
commentRouter.get('/comments/post/:postId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId;
    return __generator(this, function (_a) {
        postId = req.params.postId;
        commentController_1.getCommentsOfPost(postId)
            .then(function (comments) { return res.status(200).json(comments); })
            .catch(function (e) {
            return res.status(500).json({ error: "The writer was not found: " + e.message });
        });
        return [2 /*return*/];
    });
}); });
commentRouter.delete('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var writerId, postId, commentId;
    return __generator(this, function (_a) {
        writerId = req.body.writerId;
        postId = req.body.postId;
        commentId = req.body.commentId;
        commentController_1.deleteComment(writerId, postId, commentId)
            .then(function () { return res.status(200).send('Comment deleted'); })
            .catch(function (e) {
            return res.status(500).json({ error: "The comment does not exist: " + e.message });
        });
        return [2 /*return*/];
    });
}); });
exports.default = commentRouter;
