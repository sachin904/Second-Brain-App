"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const zod_1 = require("zod");
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userBody = zod_1.z.object({
            userName: zod_1.z.string().min(3).max(30),
            password: zod_1.z.string().min(6).max(30)
        });
        // const updateBody: FinalUserSchema = req.body;
        const parseDataWithSuccess = userBody.safeParse(req.body);
        if (!parseDataWithSuccess.success) {
            res.status(401).json({
                msg: "invalid input",
                error: parseDataWithSuccess.error
            });
        }
        const userName = req.body.userName;
        const password = req.body.password;
        let errorThrown = false;
        try {
            const hashedpassword = yield bcrypt_1.default.hash(password, 5);
            console.log(hashedpassword);
            yield db_1.UserModel.create({
                userName: userName,
                password: hashedpassword
            });
        }
        catch (e) {
            res.json({
                msg: "user already exists "
            });
            errorThrown = true;
        }
        if (!errorThrown) {
            res.json({
                msg: "you are signed up"
            });
        }
    });
});
app.post("/api/v1/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userName = req.body.userName;
        const password = req.body.password;
        const user = yield db_1.UserModel.findOne({
            userName
        });
        if (!user) {
            res.json({
                msg: "invalid credentials"
            });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (passwordMatch) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_SECRET);
            res.json({
                msg: "signed in",
                token: token
            });
        }
        else {
            res.json({
                msg: "invalid credential"
            });
        }
    });
});
app.post("/api/v1/content", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = req.body.link;
        const type = req.body.type;
        const title = req.body.title;
        yield db_1.ContentModel.create({
            link: link,
            type: type,
            title: title,
            tags: [],
            userId: req.userId
        });
        res.json({
            msg: "content added"
        });
    });
});
app.get("/api/v1/content", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        const content = yield db_1.ContentModel.find({
            userId: userId
        }).populate("userId");
        res.json({
            content
        });
    });
});
app.delete("/api/v1/content", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentId = req.body.contentId;
        yield db_1.ContentModel.deleteMany({
            _id: contentId,
            userId: req.userId
        });
        res.json({
            msg: "deleted"
        });
    });
});
app.post("/api/v1/brain/share", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const share = req.body.share;
        if (share) {
            const existngLink = yield db_1.LinkModel.findOne({
                userId: req.userId
            });
            if (existngLink) {
                res.json({
                    hash: existngLink.hash
                });
                return;
            }
            const hash = (0, utils_1.random)(10);
            yield db_1.LinkModel.create({
                hash: hash,
                userId: req.userId
            });
            res.json({
                message: hash
            });
        }
        else {
            yield db_1.LinkModel.deleteOne({
                userId: req.userId
            });
        }
        res.json({
            msg: "removed link"
        });
    });
});
app.get("/api/v1/brain/:shareLink", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = req.params.shareLink;
        const link = yield db_1.LinkModel.findOne({
            hash: hash
        });
        if (!link) {
            res.json({
                msg: "sorry incorrect input"
            });
            return;
        }
        const content = yield db_1.ContentModel.find({
            userId: link.userId
        });
        const user = yield db_1.UserModel.findOne({
            _id: link.userId
        });
        if (!user) {
            res.status(411).json({
                message: "usernot found,error should ideallly not happend "
            });
            return;
        }
        res.json({
            username: user.userName,
            content: content
        });
    });
});
app.listen(3001);
