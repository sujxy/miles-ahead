import express from "express";
import userRouter from "./user.js";
import chatRouter from "./chat";

const router = express.Router();

router.use("/user", userRouter);
router.use("/chat", chatRouter);
// router.use('/user' , userRouter) ;

export default router;
