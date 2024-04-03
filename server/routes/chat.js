import express from "express";
import {
  handleChat_1,
  handleChat_2,
  GetColleges,
  GetJobs,
} from "../controllers/chat.js";
import { GetAllMessages } from "../controllers/message.js";
import { verifyToken } from "../middleware/verifyToken.js";
import ChatModel from "../models/chatModel.js";

const chatRouter = express.Router();
//user routes
chatRouter.post(
  "/p2/question",
  verifyToken,
  async (req, res, next) => {
    try {
      const user_id = req.userId;
      const { chat_id, userResponse, type } = req.body;
      //if chat id is there ,continue :
      if (chat_id) {
        console.log("chat id present contining..");
        next();
      }
      //if not, then create a new
      else {
        console.log("chat id absent creating..");
        const conversation = await ChatModel.create({
          user_id,
          type,
        });
        req.body.chat_id = conversation._id;
        req.body.userResponse = userResponse;
        req.body.type = type;

        next();
      }
    } catch (e) {
      console.log(`error creating chat : ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  },
  handleChat_1,
);

chatRouter.post(
  "/p3/question",
  verifyToken,
  async (req, res, next) => {
    try {
      const user_id = req.userId;
      const { chat_id, userResponse, type } = req.body;
      //if chat id is there ,continue :
      if (chat_id) {
        console.log("chat id present contining..");
        next();
      }
      //if not, then create a new
      else {
        console.log("chat id absent creating..");
        const conversation = await ChatModel.create({
          user_id,
          type,
        });
        req.body.chat_id = conversation._id;
        req.body.userResponse = userResponse;
        req.body.type = type;

        next();
      }
    } catch (e) {
      console.log(`error creating chat : ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  },
  handleChat_2,
);

chatRouter.post("/p4/colleges", GetColleges);
chatRouter.post("/p4/jobs", GetJobs);

//for storing chats and messages
//chatRouter.post("/addChat", verifyToken, AddChat);
//chatRouter.post("/addMessage", AddMessage);
chatRouter.get("/getAllMessages", GetAllMessages); //using chat id
//chatRouter.get("/getAllLatestMessages", GetAllLatestMessages); //using user id

//chatRouter.get("/getLatestChatId", GetLatestChatId);

export default chatRouter;
