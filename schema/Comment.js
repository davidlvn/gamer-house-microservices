"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = exports.commentSchemaName = void 0;
var mongoose_1 = require("mongoose");
exports.commentSchemaName = 'Comment';
var commentCollectionName = 'comments';
exports.CommentSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    writer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Gamer', required: true },
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Post', required: true },
    createdAt: { type: Date, required: false },
});
exports.CommentSchema.methods.getID = function () {
    return this._id ? this._id.toString() : null;
};
exports.default = mongoose_1.model(exports.commentSchemaName, exports.CommentSchema, commentCollectionName);
