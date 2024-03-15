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
const express_1 = require("express");
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const user_validation_1 = __importDefault(require("@/resources/user/user.validation"));
const user_service_1 = __importDefault(require("@/resources/user/user.service"));
const cookie_authentication_1 = __importDefault(require("@/middleware/cookie_authentication"));
const region_model_1 = __importDefault(require("@/resources/region/region.model"));
class UserController {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.UserService = new user_service_1.default();
        this.region = region_model_1.default;
        this.userlayout = '.././views/layouts/user-layout';
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { Full_Name, email, password, role } = req.body;
                const token = yield this.UserService.register(Full_Name, email, password, role);
                res.status(201).redirect('login');
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                let options = {
                    maxAge: 20 * 60 * 1000, // would expire in 20minutes
                    httpOnly: true, // The cookie is only accessible by the web server
                    secure: true,
                    sameSite: "None",
                };
                const token = yield this.UserService.login(email, password);
                res.cookie("SessionID", token, options);
                res.render('userdashboard', { layout: this.userlayout });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getUser = (req, res, next) => {
            if (!req.user) {
                return next(new http_exception_1.default(404, 'No logged in user'));
            }
            res.status(200).send({ data: req.user });
        };
        this.userLogin = (req, res, next) => {
            res.status(200).render('login');
        };
        this.welcome = (req, res, next) => {
            // res.json({data: 'Welcome to our api'})
            res.status(200).render('index');
        };
        this.user_signup = (req, res, next) => {
            res.status(200).render('register');
            // res.json({data: 'Welcome to our api'})
        };
        this.findRegion = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allRegionsData = yield this.region.find({}).lean();
                res.render('display', { regions: allRegionsData, layout: this.userlayout });
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        // this.router.get(`${this.path}`, authenticated, this.getUser)
        this.router.get(`${this.path}`, cookie_authentication_1.default, this.getUser);
        this.router.get(`${this.path}/welcome`, this.welcome);
        this.router.get(`${this.path}/login`, this.userLogin);
        this.router.get(`${this.path}/signup`, this.user_signup);
        this.router.get(`${this.path}/regions`, cookie_authentication_1.default, this.findRegion);
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_validation_1.default.register), this.register);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(user_validation_1.default.login), this.login);
    }
}
exports.default = UserController;
