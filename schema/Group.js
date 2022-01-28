"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSchema = exports.groupSchemaName = void 0;
var mongoose_1 = require("mongoose");
exports.groupSchemaName = 'Group';
var groupCollectionName = 'groups';
exports.GroupSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, required: false },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Gamer', require: false }],
    banner: { type: String, required: false },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Gamer', required: false },
});
exports.GroupSchema.methods.getID = function () {
    return this._id ? this._id.toString() : null;
};
exports.default = mongoose_1.model(exports.groupSchemaName, exports.GroupSchema, groupCollectionName);
