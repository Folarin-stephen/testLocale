import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from "@/resources/region/region.validation";
import RegionService from '@/resources/region/region.service';
import RegionModel from '@/resources/region/region.model';
import verifyCookie from '@/middleware/cookie_authentication';
import authenticated from '@/middleware/authenticated.middleware';

class RegionController implements Controller {
    public path = '/regions';
    public router = Router();
    private RegionService = new RegionService();
    private region = RegionModel

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(
            `${this.path}`,
            verifyCookie,
            this.findRegion
        )
    }

    private findRegion = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise< Response | void > =>{
        try {
            const allRegionsData = await this.region.find({}).lean();
    
            res.status(200).json( { regions: allRegionsData });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id, geopolitical_zone, states, population, history, language_Spoken } = req.body;

            const region = await this.RegionService.create(_id, geopolitical_zone, states, population, history, language_Spoken );

            res.status(201).json({ region });
        } catch (error) {
            next(new HttpException(400, 'Cannot create region'));
        }
    };
}

export default RegionController;