"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ENVIRONMENT = exports.DEFAULT_PORT = exports.DEFAULT_APP_URL = exports.SECRET_ACCESS_TOKEN = exports.DB_CONNECTION_STRING = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
// load environment variables from .env file
dotenv_1.default.config();
/** Connection string to connect our backend to our mongo database */
exports.DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
/** Secret token to sign JWT */
exports.SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;
/** Default App URL */
exports.DEFAULT_APP_URL = process.env.DEFAULT_APP_URL;
/** Default port */
exports.DEFAULT_PORT = 3000;
/** Default running environment */
exports.DEFAULT_ENVIRONMENT = 'local';
