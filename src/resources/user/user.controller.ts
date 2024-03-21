import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';
import verifyCookie from '@/middleware/cookie_authentication';
import RegionModel from '@/resources/region/region.model';
import StateModel from '@/resources/state/state.model'
import Blacklist from '@/resources/user/user.blaclistModel';
import {transporter} from '@/utils/emailService'
import userModel from '@/resources/user/user.model'
import IUser from '@/resources/user/user.interface'
import {IRegion} from '@/resources/region/region.interface'
import {IState} from '@/resources/state/state.interface'

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();
    private region = RegionModel
    private state = StateModel
    private blaclist = Blacklist
    public userlayout = '.././views/layouts/user-layout'
   private users = userModel

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        // this.router.get(`${this.path}`, authenticated, this.getUser)
        this.router.get(`${this.path}`, verifyCookie, this.getUser)
        this.router.get('/',  this.welcome);
        this.router.get(`${this.path}/login`,  this.userLogin);
        this.router.get(`${this.path}/signup`,  this.user_signup);
        this.router.get(
            `${this.path}/regions`,
            verifyCookie,
            this.findRegion
        )
        this.router.get(
            `${this.path}/search/regions`,
            verifyCookie,
            this.findOneRegion
        )
        this.router.get(
            `${this.path}/search/states`,
            verifyCookie,
            this.findOneState
        )

        this.router.get(
            `${this.path}/states`,
            verifyCookie,
            this.findStates
        )
        
        this.router.get('/verify', this.verify )

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
        this.router.get(
            `${this.path}/logout`,
            this.user_logout
        )
        
        
        
    }

    private findOneState = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{
        const {state} = req.query;
        console.log(state);
        

        const stateS: IState | null = await this.state.findOne({ name: state })

        if (!stateS) {
            return res.status(400).json({message: "Invalid Region"})
        }

    

        res.status(200).render('displayOneState', { state: stateS, layout: this.userlayout })
    }

    private findOneRegion = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{
        const {region} = req.query;
        console.log(region);
        

        const regionR: IRegion | null = await RegionModel.findOne({ geopolitical_zone: region })

        if (!regionR) {
            return res.status(400).json({message: "Invalid State"})
        }

    

        res.status(200).render('displayOneRegion', { region: regionR, layout: this.userlayout })
    }

    private verify = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{
        const {token} = req.query;

        const user: IUser | null = await userModel.findOne({ apiKey: token })

        if (!user) {
            return res.status(400).json({message: "Invalid token"})
        }

        user.verified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' })
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

            // const mailOptions = {
            //     from: process.env.EMAIL_USERNAME,
            //     to: email,
            //     subject: 'Email Verification',
            //     text: `Click the following link to verify your account: http://localhost:${process.env.PORT}/verify?token=${this.user.apikey}`
            // }

            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         console.error('Error sending email:', error.message);
            //         return res.status(500).json({message: 'Failed to send verification email'})
            //     }
            // })

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

    private user_logout = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const authHeader = req.headers['cookie']; // get the session cookie from request header
            if (!authHeader) return res.sendStatus(204); // No content
            const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
            const accessToken = cookie.split(';')[0];
            const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
            // if true, send a no content response.
            if (checkIfBlacklisted) return res.sendStatus(204);
            // otherwise blacklist token
            const newBlacklist = new this.blaclist({
              token: accessToken,
            });
            await newBlacklist.save();
            // Also clear request cookie on client
            res.setHeader('Clear-Site-Data', '"cookies"');
            res.redirect('login');
          } catch (err) {
            res.status(500).json({
              status: 'error',
              message: 'Internal Server Error',
            });
          }
          res.end();
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
       private findStates = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise< Response | void > =>{
        try {
            const allStatesData = await this.state.find({}).lean();
    
            res.render('displayStates', { states: allStatesData, layout: this.userlayout });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

export default UserController;