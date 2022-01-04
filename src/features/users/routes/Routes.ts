import { Router } from 'express';
import UsersController from '../controllers/UsersController';

export default class Routes{

    public init(): Router {
        const routes = Router();
        const controller = new UsersController();

        // CREATE A USER
        routes.post('/adduser', controller.storeUser);

        // VERIFY USER PASS - IF PASS ok RETURNS 'uid'
        routes.get('/pass', controller.index);

        // LIST ALL Users
        routes.get('/users', controller.index_all);

        // GET ONE USER FOR EDIT
        routes.get('/eduser/:userid', controller.getone);

        // SAVE EDITED USER
        routes.put('/user/:userid', controller.update);

        // DELETE  AN USER
        routes.delete('/user/:userid', controller.destroy);

        return routes;
    }
}
