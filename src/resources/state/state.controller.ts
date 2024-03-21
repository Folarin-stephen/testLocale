import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import verifyCookie from '@/middleware/cookie_authentication';
import authenticated from '@/middleware/authenticated.middleware';
import validate from "@/resources/state/state.validation";
import stateService from '@/resources/state/state.service';
import stateModel from '@/resources/state/state.model';
import { IState } from './state.interface';


class StateController implements Controller {
    public path = '/states';
    public router = Router();
    private StateService = new stateService();
    private state = stateModel

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.createState),
            this.create
        );
        // this.router.get(
        //     `${this.path}`,
        //     verifyCookie,
        //     this.findRegion
        // )
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id,  name, geopolitical_zone, localGovernments, overview, language_Spoken } = req.body;
            console.log(req.body);

            const state = await this.StateService.create(_id,  name, geopolitical_zone, localGovernments, overview, language_Spoken );
            console.log(state);
            

            res.status(201).json({ state });
        } catch (error) {
            console.log(error);
            
            next(new HttpException(400, 'Cannot create state'));
        }
    };


}

export default StateController;