import express from "express";
import { handleChat_1, handleChat_2 } from "../controllers/chat";

const chatRouter = express.Router();
//user routes
chatRouter.post("/p1/question", handleChat_1);
chatRouter.post("/p2/question", handleChat_2);

export default chatRouter;
