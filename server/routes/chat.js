import express from "express";
import { handleChat_1, handleChat_2, AddChat } from "../controllers/chat.js";
import { AddMessage } from "../controllers/message.js";

const chatRouter = express.Router();
//user routes
chatRouter.post("/p2/question", handleChat_1);
chatRouter.post("/p3/question", handleChat_2);
//for storing chats and messages
chatRouter.post("/addChat", AddChat);
chatRouter.post("/addMessage", AddMessage);

export default chatRouter;
