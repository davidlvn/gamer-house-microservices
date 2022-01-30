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
exports.deletePostFromGamer = exports.filterPosts = exports.getPosts = exports.deletePost = exports.createPost = void 0;
var postTagController_1 = require("../controllers/postTagController");
var postModel_1 = require("../models/postModel");
function createPost(createPostArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var postTagsIds, post;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all([createPostArgs.tags].map(function (tagName) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, postTagController_1.getPostTagByName(tagName)];
                            case 1: return [2 /*return*/, (_a.sent()).id];
                        }
                    }); }); }))];
                case 1:
                    postTagsIds = _a.sent();
                    return [4 /*yield*/, postModel_1.createPostDB(__assign(__assign({}, createPostArgs), { tags: postTagsIds, createdAt: new Date() }))];
                case 2:
                    post = _a.sent();
                    return [4 /*yield*/, addPostToGamer(createPostArgs.writer, post.id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, post];
            }
        });
    });
}
exports.createPost = createPost;
function deletePost(postId) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postModel_1.deletePostDB(postId)];
                case 1:
                    post = _a.sent();
                    if (!post)
                        throw new Error('The requested post does not exist');
                    return [4 /*yield*/, deletePostFromGamer(post.writer, post.id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, post];
            }
        });
    });
}
exports.deletePost = deletePost;
function getPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postModel_1.getPostsDB()];
                case 1:
                    posts = _a.sent();
                    return [2 /*return*/, posts];
            }
        });
    });
}
exports.getPosts = getPosts;
function filterPosts(tagsNames) {
    return __awaiter(this, void 0, void 0, function () {
        var posts, filteredPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postModel_1.getPostsDB()];
                case 1:
                    posts = _a.sent();
                    if (!(tagsNames.length > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.all(posts.filter(function (post) {
                            var match = false;
                            for (var i = 0; i < post.tags.length; i++) {
                                if (tagsNames.includes(post.tags[i].name)) {
                                    match = true;
                                }
                            }
                            return match;
                        }))];
                case 2:
                    filteredPosts = _a.sent();
                    return [2 /*return*/, filteredPosts];
                case 3: return [2 /*return*/, posts];
            }
        });
    });
}
exports.filterPosts = filterPosts;
function addPostToGamer(writerId, postId) {
    return __awaiter(this, void 0, void 0, function () {
        var gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postModel_1.addPostToGamerDB(writerId, postId)];
                case 1:
                    gamer = _a.sent();
                    if (!gamer)
                        throw new Error('The requested gamer does not exist');
                    return [2 /*return*/, gamer];
            }
        });
    });
}
function deletePostFromGamer(writerId, postId) {
    return __awaiter(this, void 0, void 0, function () {
        var gamer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postModel_1.deletePostFromGamerDB(writerId, postId)];
                case 1:
                    gamer = _a.sent();
                    if (!gamer)
                        throw new Error('The requested gamer does not exist');
                    return [2 /*return*/, gamer];
            }
        });
    });
}
exports.deletePostFromGamer = deletePostFromGamer;
