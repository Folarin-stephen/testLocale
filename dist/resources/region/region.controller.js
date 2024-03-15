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
const region_validation_1 = __importDefault(require("@/resources/region/region.validation"));
const region_service_1 = __importDefault(require("@/resources/region/region.service"));
const region_model_1 = __importDefault(require("@/resources/region/region.model"));
const cookie_authentication_1 = __importDefault(require("@/middleware/cookie_authentication"));
class RegionController {
    constructor() {
        this.path = '/regions';
        this.router = (0, express_1.Router)();
        this.RegionService = new region_service_1.default();
        this.region = region_model_1.default;
        this.findRegion = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allRegionsData = yield this.region.find({}).lean();
                res.status(200).json({ regions: allRegionsData });
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, geopolitical_zone, states, population, history, language_Spoken } = req.body;
                const region = yield this.RegionService.create(_id, geopolitical_zone, states, population, history, language_Spoken);
                res.status(201).json({ region });
            }
            catch (error) {
                next(new http_exception_1.default(400, 'Cannot create region'));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(region_validation_1.default.create), this.create);
        this.router.get(`${this.path}`, cookie_authentication_1.default, this.findRegion);
    }
}
exports.default = RegionController;
