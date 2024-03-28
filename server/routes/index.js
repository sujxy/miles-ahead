import express from "express";
import userRouter from "./user.js";
import chatRouter from "./chat.js";
import reportRouter from "./report.js";

const defaultRouter = express.Router();

defaultRouter.use("/user", userRouter);
defaultRouter.use("/chat", chatRouter);
defaultRouter.use("/report",reportRouter);
// router.use('/user' , userRouter) ;

export  default defaultRouter;
