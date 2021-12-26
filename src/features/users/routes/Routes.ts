import { Router } from 'express';
import UsersController from '../controllers/UsersController';

export default class Routes{

    public init(): Router {
        const routes = Router();
        const controller = new UsersController();

        // CREATE A USER
        //no body vai 'name, password'
        routes.post('/user', controller.store);

        // VERIFY USER PASS - IF PASS ok RETURNS 'uid'
        // era put mas devia ser get
        // no body vai 'name, password'
        routes.get('/pass', controller.index);

        // LIST ALL Users
        routes.get('/users', controller.index_all);

        return routes;
    }
}
