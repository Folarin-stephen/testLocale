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
const user_model_1 = __importDefault(require("@/resources/user/user.model"));
const token_1 = __importDefault(require("@/utils/token"));
const emailService_1 = require("@/utils/emailService");
const node_crypto_1 = __importDefault(require("node:crypto"));
class UserService {
    constructor() {
        this.user = user_model_1.default;
        this.emailPusher = emailService_1.transporter;
        // public async logout(
        // )
    }
    /**
     * Register a new user
     */
    register(Full_Name, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = node_crypto_1.default.randomBytes(16).toString('hex');
                const user = yield this.user.create({
                    Full_Name,
                    email,
                    password,
                    role,
                    apiKey
                });
                const mailOptions = {
                    from: process.env.EMAIL_USERNAME,
                    to: user.email,
                    subject: 'Email Verification',
                    text: `Click the following link to verify your account: http://localhost:${process.env.PORT}/verify?token=${apiKey}`
                };
                this.emailPusher.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error.message);
                    }
                });
                const accessToken = token_1.default.createToken(user);
                return accessToken;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /**
     * Attempt to login a user
     */
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.findOne({ email });
                if (!user) {
                    throw new Error('Unable to find user with that email address');
                }
                if (user.verified === false) {
                    throw new Error("Please verify your account via email");
                }
                if (yield user.isValidPassword(password)) {
                    return token_1.default.createToken(user);
                }
                else {
                    throw new Error('Wrong credentials given');
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = UserService;
