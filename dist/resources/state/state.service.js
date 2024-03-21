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
const state_model_1 = __importDefault(require("@/resources/state/state.model"));
class stateService {
    constructor() {
        this.state = state_model_1.default;
    }
    /**
     * Create a new region
     */
    create(_id, name, geopolitical_zone, localGovernments, overview, language_Spoken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const state = yield this.state.create({ _id, name, geopolitical_zone, localGovernments, overview, language_Spoken });
                return state;
            }
            catch (error) {
                console.log(error);
                throw new Error('Unable to create state');
            }
        });
    }
}
exports.default = stateService;
