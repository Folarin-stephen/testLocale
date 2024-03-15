import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';
import autoIncrement from 'mongoose-auto-increment';
import expressLayout from "express-ejs-layouts";
import path from "path"

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());

        this.express.use(express.static(path.join(__dirname, 'public')));
        // Templating Engine
        this.express.use(expressLayout);
        // this.express.set('views', path.join(__dirname, 'views'))
        this.express.set('layout', './layouts/main');
        this.express.set('view engine', 'ejs');
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api/v1', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private initialiseDatabaseConnection(): void {
        const { MONGO_USER, MONGODB_PASSWORD, MONGO_PATH } = process.env;

        mongoose.connect(
            
            `mongodb+srv://folarinsteven007:${MONGODB_PASSWORD}@cluster0.monyj1q.mongodb.net/Locale_DB`
        ).then(() => {
            console.log("DB Connectedd succesfully");
            
        })
        
        
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;