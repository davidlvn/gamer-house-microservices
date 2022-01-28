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
exports.getCommentsOfPost = exports.getCommentWriter = exports.deleteComment = exports.getComment = exports.createComment = void 0;
var commentModel_1 = require("../models/commentModel");
function createComment(createCommentArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var comment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentModel_1.createCommentDB(__assign(__assign({}, createCommentArgs), { createdAt: new Date() }))];
                case 1:
                    comment = _a.sent();
                    return [4 /*yield*/, addCommentToGamer(createCommentArgs.writer, comment.id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, addCommentToPost(createCommentArgs.post, comment.id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, comment];
            }
        });
    });
}
exports.createComment = createComment;
function getComment(commentId) {
    return __awaiter(this, void 0, void 0, function () {
        var comment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentModel_1.getCommentDB(commentId)];
                case 1:
                    comment = _a.sent();
                    return [2 /*return*/, comment];
            }
        });
    });
}
exports.getComment = getComment;
function deleteComment(writerId, postId, commentId) {
    return __awaiter(this, void 0, void 0, function () {
        var comment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentModel_1.deleteCommentDB(commentId)];
                case 1:
                    comment = _a.sent();
                    return [4 /*yield*/, deleteCommentFromGamer(writerId, commentId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, deleteCommentFromPost(postId, commentId)];
                case 3:
                    _a.sent();
                    if (!comment)
                        throw new Error('The requested comment does not exist');
                    return [2 /*return*/, comment];
            }
        });
    });
}
exports.deleteComment = deleteComment;
function addCommentToPost(postId, commentId) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentModel_1.addCommentToPostDB(postId, commentId)];
                case 1:
                    post = _a.sent();
                    if (!post)
                        throw new Error('The requested post does not exist');
                    return [2 /*return*/, post];
            }
        });
    });
}
function deleteCommentFromPost(postId, commentId) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentModel_1.deleteCommentFromPostDB(postId, commentId)];
                case 1:
                    post = _a.sent();
                    if (!post)
                        throw new Error('The requested post does not exist');
                    return [2 /*return*/, post];
            }
        });
    });
}
function getCommentWriter(comment) {
    return __awaiter(this, void 0, void 0, function () {
        var writer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentModel_1.getCommentWriterDB(comment)];
                case 1:
                    writer = _a.sent();
                    if (!writer)
                        throw new Error('The requested gamer does not exist');
                    return [2 /*return*/, writer];
            }
        });
    });
}
exports.getCommentWriter = getCommentWriter;
function addCommentToGamer(writerId, commentId) {
    return __awaiter(this, void 0, void 0, function () {
        var gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentModel_1.addCommentToGamerDB(writerId, commentId)];
                case 1:
                    gamer = _a.sent();
                    if (!gamer)
                        throw new Error('The requested gamer does not exist');
                    return [2 /*return*/, gamer];
            }
        });
    });
}
function deleteCommentFromGamer(writerId, commentId) {
    return __awaiter(this, void 0, void 0, function () {
        var gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentModel_1.deleteCommentFromGamerDB(writerId, commentId)];
                case 1:
                    gamer = _a.sent();
                    if (!gamer)
                        throw new Error('The requested gamer does not exist');
                    return [2 /*return*/, gamer];
            }
        });
    });
}
function getCommentsOfPost(postId) {
    return __awaiter(this, void 0, void 0, function () {
        var comments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentModel_1.getCommentsOfPostDB(postId)];
                case 1:
                    comments = _a.sent();
                    if (!comments)
                        throw new Error('The requested gamer does not exist');
                    return [2 /*return*/, comments];
            }
        });
    });
}
exports.getCommentsOfPost = getCommentsOfPost;
