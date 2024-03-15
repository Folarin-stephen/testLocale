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
exports.VerifyCookie = void 0;
const token_1 = __importDefault(require("@/utils/token"));
const user_model_1 = __importDefault(require("@/resources/user/user.model"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function VerifyCookie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bearer = req.headers["cookie"]; // get the session cookie from request header
        console.log(bearer);
        if (!bearer || !bearer.startsWith('SessionID=')) {
            return next(new http_exception_1.default(401, 'Unauthorised'));
        }
        // const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
        // const accessToken = cookie.split(';')[0];
        const cookie = bearer.split('SessionID=')[1];
        console.log(cookie);
        try {
            const payload = yield token_1.default.verifyToken(cookie);
            console.log(payload);
            if (payload instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return next(new http_exception_1.default(401, 'Unauthorised'));
            }
            const user = yield user_model_1.default.findById(payload.id)
                .select('-password')
                .exec();
            if (!user) {
                return next(new http_exception_1.default(401, 'Unauthorised'));
            }
            req.user = user;
            return next();
        }
        catch (error) {
            return next(new http_exception_1.default(401, 'Unauthorised'));
        }
    });
}
exports.VerifyCookie = VerifyCookie;
exports.default = VerifyCookie;
