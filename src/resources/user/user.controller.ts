import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';
import verifyCookie from '@/middleware/cookie_authentication';
import RegionModel from '@/resources/region/region.model';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();
    private region = RegionModel
    public userlayout = '../layouts/user-layout'

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        // this.router.get(`${this.path}`, authenticated, this.getUser)
        this.router.get(`${this.path}`, verifyCookie, this.getUser)
        this.router.get(`${this.path}/welcome`,  this.welcome);
        this.router.get(`${this.path}/login`,  this.userLogin);
        this.router.get(`${this.path}/signup`,  this.user_signup);
        this.router.get(
            `${this.path}/regions`,
            verifyCookie,
            this.findRegion
        )

        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        
        
        
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { Full_Name, email, password, role } = req.body;

            const token = await this.UserService.register(
                Full_Name,
                email,
                password,
                role
            );

            res.status(201).redirect('login');
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            let options: Object = {
                maxAge: 20 * 60 * 1000, // would expire in 20minutes
                httpOnly: true, // The cookie is only accessible by the web server
                secure: true,
                sameSite: "None",
            };

            const token = await this.UserService.login(email, password);

            res.cookie("SessionID", token, options); 

            res.render('userdashboard', {layout: this.userlayout})
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        if (!req.user) {
            return next(new HttpException(404, 'No logged in user'));
        }

        res.status(200).send({ data: req.user });
    }

    private userLogin = (
        req: Request,
        res: Response,
        next: NextFunction 
    ): Response | void => {
        res.status(200).render('login')
    }


    private welcome = (
        req: Request,
        res: Response,
        next: NextFunction 
    ): Response | void => {
        // res.json({data: 'Welcome to our api'})
        res.status(200).render('index')
    }

    private user_signup = (
        req: Request,
        res: Response,
        next: NextFunction 
    ): Response | void => {
        res.status(200).render('register')
        // res.json({data: 'Welcome to our api'})
    }

       private findRegion = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise< Response | void > =>{
        try {
            const allRegionsData = await this.region.find({}).lean();
    
            res.render('display', { regions: allRegionsData, layout: this.userlayout });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

export default UserController;