import express from "express";
import {
  handleChat_1,
  handleChat_2,
  AddChat,
  GetLatestChatId,
  GetColleges,
  GetJobs,
} from "../controllers/chat.js";
import {
  AddMessage,
  GetAllMessages,
  GetAllLatestMessages,
} from "../controllers/message.js";

const chatRouter = express.Router();
//user routes
chatRouter.post("/p2/question", handleChat_1);
chatRouter.post("/p3/question", handleChat_2);
chatRouter.post("/p4/colleges", GetColleges);
chatRouter.post("/p4/jobs", GetJobs);
//for storing chats and messages
chatRouter.post("/addChat", AddChat);
chatRouter.post("/addMessage", AddMessage);
chatRouter.get("/getAllMessages", GetAllMessages); //using chat id
chatRouter.get("/getAllLatestMessages", GetAllLatestMessages); //using user id

chatRouter.get("/getLatestChatId", GetLatestChatId);

export default chatRouter;
