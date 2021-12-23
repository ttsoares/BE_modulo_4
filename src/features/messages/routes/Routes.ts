import { Router } from 'express';

import messagesController from '../controllers/MessagesController';

export default class Routes{

    public init(): Router {
        const routes = Router();

        const controller = new messagesController();

        // ADD MESSAGES TO AN USER
        // no body vão description e details
        routes.post('/user/:userid', controller.store);

        // GET ALL MESSAGES FROM AN USER
        routes.get('/user/:userid', controller.index);

        // DELETE MESSAGES FROM AN USER
        routes.delete('/user/:userid/message/:messageid', controller.destroy);

        // RETURN ONE MESSAGE FROM AN USER
        routes.get('/user/:userid/message/:messageid', controller.view);

        // SAVE EDITED MESSAGE FROM AN USER
        // no body vão description e details
        routes.put('/user/:userid/message/:messageid', controller.update);

        return routes;
    }

}
