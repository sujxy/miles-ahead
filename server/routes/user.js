import express from "express";
import {
  getUserData,
  handleSignIn,
  handleSignUp,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRouter = express.Router();
//user routes
userRouter.post("/signup", handleSignUp);
userRouter.post("/signin", handleSignIn);
userRouter.get("/", verifyToken, getUserData);

export default userRouter;
