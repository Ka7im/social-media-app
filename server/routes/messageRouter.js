import express from "express";
import { checkAuth } from "../middleware/index.js";
import { MessageController } from "../controllers/index.js";
const messageRouter = express.Router();

messageRouter.get("/message", checkAuth, MessageController.getAll);
messageRouter.get("/dialogs", checkAuth, MessageController.getDialogs);
messageRouter.post("/message", checkAuth, MessageController.newMessage);

export default messageRouter;
