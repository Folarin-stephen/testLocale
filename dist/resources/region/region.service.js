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
const region_model_1 = __importDefault(require("@/resources/region/region.model"));
class RegionService {
    constructor() {
        this.region = region_model_1.default;
    }
    /**
     * Create a new region
     */
    create(_id, geopolitical_zone, states, history, language_Spoken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const region = yield this.region.create({ _id, geopolitical_zone, states, history, language_Spoken });
                return region;
            }
            catch (error) {
                throw new Error('Unable to create post');
            }
        });
    }
}
exports.default = RegionService;
