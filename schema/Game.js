"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSchema = exports.gameSchemaName = void 0;
var mongoose_1 = require("mongoose");
exports.gameSchemaName = 'Game';
var gameCollectionName = 'games';
exports.GameSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    picture: { type: String, required: true },
});
exports.GameSchema.methods.getID = function () {
    return this._id ? this._id.toString() : null;
};
exports.default = mongoose_1.model(exports.gameSchemaName, exports.GameSchema, gameCollectionName);
