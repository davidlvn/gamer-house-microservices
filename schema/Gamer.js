"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamerSchema = exports.gamerSchemaName = void 0;
var mongoose_1 = require("mongoose");
exports.gamerSchemaName = 'Gamer';
var gamerCollectionName = 'gamers';
exports.GamerSchema = new mongoose_1.Schema({
    pseudo: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    profilePicture: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    country: { type: String, required: false },
    city: { type: String, required: false },
    statusMessage: { type: String, required: false },
    description: { type: String, required: false },
    createdAt: { type: Date, required: false },
    posts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Post', required: false }],
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Gamer', required: true }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Gamer', required: true }],
    gamesWithRank: {
        type: [
            {
                game: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Game',
                    required: true,
                },
                rank: {
                    type: String,
                    required: false,
                },
            },
        ],
        required: false,
    },
    groups: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Game', required: true }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment', required: true }],
});
exports.GamerSchema.methods.getID = function () {
    return this._id ? this._id.toString() : null;
};
exports.default = mongoose_1.model(exports.gamerSchemaName, exports.GamerSchema, gamerCollectionName);
