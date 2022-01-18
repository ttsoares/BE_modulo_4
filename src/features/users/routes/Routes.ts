import { Router } from 'express';
import UsersController from '../controllers/UsersController';

export default class Routes{

    public init(): Router {
        const routes = Router();
        const controller = new UsersController();

        // CREATE A USER
        routes.post('/user/store', controller.store);

        // VERIFY USER PASS - IF PASS ok RETURNS 'uid'
        routes.post('/user', controller.index);

        // LIST ALL Users
        routes.get('/users', controller.view);

        // GET ONE USER FOR EDIT
        routes.get('/user/:userid', controller.index2);

        // SAVE EDITED USER
        routes.put('/user/:userid', controller.update);

        // DELETE  AN USER
        routes.delete('/user/:userid', controller.destroy);

        return routes;
    }
}
