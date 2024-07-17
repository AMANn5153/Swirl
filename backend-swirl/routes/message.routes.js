import  express from 'express';
import sendMessage, {getMessage} from '../controller/message.controller.js';
import protectRoute from '../authorization/auth.protectRoutes.js';

const messageRouter =  express.Router();


messageRouter.post("/send/:id", protectRoute, sendMessage);

messageRouter.get("/find/:userToFind", protectRoute, getMessage);

export default messageRouter;