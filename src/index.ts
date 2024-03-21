import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import RegionController from '@/resources/region/region.controller';
import UserController from '@/resources/user/user.controller';
import StateController from '@/resources/state/state.controller'

validateEnv();

const app = new App(
    [ new StateController(), new RegionController(), new UserController()],
    Number(process.env.PORT)
);

app.listen();