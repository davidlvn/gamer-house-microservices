"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.PostTagSchema = exports.postTagSchemaName = void 0;
var mongoose_1 = require("mongoose");
exports.postTagSchemaName = 'PostTag';
var postTagCollectionName = 'postsTags';
exports.PostTagSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    category: {
        type: String,
        enum: ['#f50', '#2db7f5'],
        required: true,
    },
});
var Category;
(function (Category) {
    Category["Game"] = "#f50";
    Category["Event"] = "#2db7f5";
})(Category = exports.Category || (exports.Category = {}));
exports.PostTagSchema.methods.getID = function () {
    return this._id ? this._id.toString() : null;
};
exports.default = mongoose_1.model(exports.postTagSchemaName, exports.PostTagSchema, postTagCollectionName);
