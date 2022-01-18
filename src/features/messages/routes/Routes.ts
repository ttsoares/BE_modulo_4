import { Router } from 'express';
import messagesController from '../controllers/MessagesController';
export default class Routes{
    public init(): Router {
        const routes = Router();
        const controller = new messagesController();

        // ADD MESSAGES TO AN USER
        //routes.post('/addusermsg/:userid', controller.storeMsgs);
        routes.post('/message/:userid', controller.store);

        // GET ALL MESSAGES FROM AN USER
        //routes.get('/usermsgs/:userid', controller.indexMsgs);
        routes.get('/messages/:userid', controller.view);

        // DELETE MESSAGES FROM AN USER
        routes.delete('/user/:userid/message/:messageid', controller.destroy);

        // RETURN ONE MESSAGE FROM AN USER
        routes.get('/user/:userid/message/:messageid', controller.index);

        // SAVE EDITED MESSAGE FROM AN USER
        routes.put('/user/:userid/message/:messageid', controller.update);

        return routes;
    }
}
