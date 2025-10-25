import express from "express";
import userAuth from "../middleware/user.middleware.js";
import {sendMessage} from "../controllers/Message.controllers.js";

const messageRouter = express.Router();

messageRouter.post('/send-message',userAuth, sendMessage);

export default messageRouter;