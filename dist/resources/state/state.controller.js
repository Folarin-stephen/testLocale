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
const state_validation_1 = __importDefault(require("@/resources/state/state.validation"));
const state_service_1 = __importDefault(require("@/resources/state/state.service"));
const state_model_1 = __importDefault(require("@/resources/state/state.model"));
class StateController {
    constructor() {
        this.path = '/states';
        this.router = (0, express_1.Router)();
        this.StateService = new state_service_1.default();
        this.state = state_model_1.default;
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, name, geopolitical_zone, localGovernments, overview, language_Spoken } = req.body;
                console.log(req.body);
                const state = yield this.StateService.create(_id, name, geopolitical_zone, localGovernments, overview, language_Spoken);
                console.log(state);
                res.status(201).json({ state });
            }
            catch (error) {
                console.log(error);
                next(new http_exception_1.default(400, 'Cannot create state'));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(state_validation_1.default.createState), this.create);
        // this.router.get(
        //     `${this.path}`,
        //     verifyCookie,
        //     this.findRegion
        // )
    }
}
exports.default = StateController;
