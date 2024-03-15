"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const error_middleware_1 = __importDefault(require("@/middleware/error.middleware"));
const helmet_1 = __importDefault(require("helmet"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const path_1 = __importDefault(require("path"));
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }
    initialiseMiddleware() {
        this.express.use((0, helmet_1.default)());
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
        this.express.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        // Templating Engine
        this.express.use(express_ejs_layouts_1.default);
        // this.express.set('views', path.join(__dirname, 'views'))
        this.express.set('layout', './layouts/main');
        this.express.set('view engine', 'ejs');
    }
    initialiseControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/api/v1', controller.router);
        });
    }
    initialiseErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    initialiseDatabaseConnection() {
        const { MONGO_USER, MONGODB_PASSWORD, MONGO_PATH } = process.env;
        mongoose_1.default.connect(`mongodb+srv://folarinsteven007:${MONGODB_PASSWORD}@cluster0.monyj1q.mongodb.net/Locale_DB`).then(() => {
            console.log("DB Connectedd succesfully");
        });
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
