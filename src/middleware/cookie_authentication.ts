import { Request, Response, NextFunction } from 'express';
import token from '@/utils/token';
import UserModel from '@/resources/user/user.model';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';
import jwt from 'jsonwebtoken';


export async function VerifyCookie(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
    const bearer = req.headers["cookie"]; // get the session cookie from request header
    console.log(bearer);
    

    if (!bearer || !bearer.startsWith('SessionID=')) {
        return next(new HttpException(401, 'Unauthorised'));
    }
    // const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
    // const accessToken = cookie.split(';')[0];

    const cookie = bearer.split('SessionID=')[1]
   
    console.log(cookie);
    
    try {
        const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(
            cookie
        );
        console.log(payload);
        

        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorised'));
        }

        const user = await UserModel.findById(payload.id)
            .select('-password')
            .exec();

        if (!user) {
            return next(new HttpException(401, 'Unauthorised'));
        }

        req.user = user;

        return next();
    } catch (error) {
        return next(new HttpException(401, 'Unauthorised'));
    }
}

export default VerifyCookie;
