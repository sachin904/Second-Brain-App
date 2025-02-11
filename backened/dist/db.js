"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.TagModel = exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const config_1 = require("./config");
mongoose_1.default.connect(config_1.MONGO_URL);
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new mongoose_1.default.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const tagSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true }
});
const contentTypes = ['image', 'video', 'article', 'audio', "youtube", "twitter"];
const contentSchema = new mongoose_1.default.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.Types.ObjectId, ref: 'Tags' }],
    userId: { type: mongoose_1.Types.ObjectId, ref: 'Users', required: true },
});
console.log("MONGO_URL from env:", process.env.MONGO_URL);
const linkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Users', required: true },
});
exports.UserModel = mongoose_1.default.model("Users", userSchema);
exports.TagModel = mongoose_1.default.model("Tags", tagSchema);
exports.ContentModel = mongoose_1.default.model("Contents", contentSchema);
exports.LinkModel = mongoose_1.default.model("Links", linkSchema);
