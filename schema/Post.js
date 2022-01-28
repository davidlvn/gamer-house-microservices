"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = exports.postSchemaName = void 0;
var mongoose_1 = require("mongoose");
exports.postSchemaName = 'Post';
var postCollectionName = 'posts';
exports.PostSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    writer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Gamer', required: true },
    createdAt: { type: Date, required: false },
    game: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Game', required: true }],
    tags: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'PostTag', required: true }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment', required: true }],
});
exports.PostSchema.methods.getID = function () {
    return this._id ? this._id.toString() : null;
};
exports.default = mongoose_1.model(exports.postSchemaName, exports.PostSchema, postCollectionName);
