import express from "express";
import { getUserData, handleSignIn, handleSignUp } from "../controllers/user.js";

const userRouter = express.Router();
//user routes
userRouter.post("/signup", handleSignUp);
userRouter.post("/signin", handleSignIn);
userRouter.get("/", getUserData);

export default userRouter;
