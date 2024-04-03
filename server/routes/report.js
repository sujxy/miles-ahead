import express from "express";
import {
  AddReport1,
  AddReport2,
  GetReport1,
  GetReport2,
} from "../controllers/report.js";
import { verifyToken } from "../middleware/verifyToken.js";

const reportRouter = express.Router();

//add reports
reportRouter.post("/report1", AddReport1);
reportRouter.post("/report2", AddReport2);
//get reports
reportRouter.get("/getReport1", verifyToken, GetReport1);
reportRouter.get("/getReport2", verifyToken, GetReport2);

export default reportRouter;
