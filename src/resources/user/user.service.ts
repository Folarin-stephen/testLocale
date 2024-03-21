import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';
import {transporter} from '@/utils/emailService'
import userModel from '@/resources/user/user.model';
import crypto from 'node:crypto'




class UserService {
    private user = UserModel;
    public emailPusher = transporter

    /**
     * Register a new user
     */
    public async register(
        
        Full_Name: string,
        email: string,
        password: string,
        role: string,
      
    ): Promise<string | Error> {
        try {
            const apiKey = crypto.randomBytes(16).toString('hex')
            const user = await this.user.create({
                Full_Name,
                email,
                password,
                role,
                apiKey
             
            });
         
            const mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: user.email,
                subject: 'Email Verification',
                text: `Click the following link to verify your account: http://localhost:${process.env.PORT}/verify?token=${apiKey}`
            }

            this.emailPusher.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error.message);
                }
            })
         

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to login a user
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });

           

            if (!user) {
                throw new Error('Unable to find user with that email address');
            }
            if(user.verified === false){
                throw new Error("Please verify your account via email");
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
                
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    // public async logout(

    // )
}

export default UserService;