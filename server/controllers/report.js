import UserModel from "../models/userModel.js";
import ChatModel from "../models/chatModel.js";
import { Report1Model, Report2Model } from "../models/reportModel.js";

//add report1 analysis to mongodb
const AddReport1 = async (req, res) => {
  try {
    const { user_id, chat_id, scores, content } = req.body;
    const findUser = await UserModel.findOne({ _id: user_id });

    if (!findUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    const findChat = await ChatModel.findOne({ _id: chat_id });

    if (!findChat) {
      return res
        .status(404)
        .json({ status: "fail", message: "Chat not found" });
    }

    const newReport = new Report1Model({
      user_id,
      chat_id,
      scores,
      content,
    });

    await newReport.save();
    res
      .status(200)
      .json({ status: "success", message: "Report 1 analysis added" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Error from backend" });
    console.log(error);
  }
};

//add report2 analysis to mongodb
const AddReport2 = async (req, res) => {
  try {
    const { user_id, chat_id, content, userOptions } = req.body;
    const findUser = await UserModel.findOne({ _id: user_id });

    if (!findUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    const findChat = await ChatModel.findOne({ _id: chat_id });

    if (!findChat) {
      return res
        .status(404)
        .json({ status: "fail", message: "Chat not found" });
    }

    const newReport = new Report2Model({
      user_id,
      chat_id,
      content,
      userOptions,
    });

    await newReport.save();
    res
      .status(200)
      .json({ status: "success", message: "Report 2 analysis added" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Error from backend" });
    console.log(error);
  }
};

//get report 1 data
const GetReport1 = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("report for user : ", userId);
    // const { chat_id } = req.query;
    const report1 = await Report1Model.findOne({
      user_id: userId,
    });

    if (!report1) {
      return res
        .status(404)
        .json({ status: "fail", message: "Report 1 not found" });
    }

    return res.status(200).json({ message: report1 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error from backend" });
  }
};

//get report 2 data
const GetReport2 = async (req, res) => {
  try {
    const userId = req.userId;
    const { chat_id } = req.query;
    const report2 = await Report2Model.findOne({
      user_id: userId,
    });

    if (!report2) {
      return res
        .status(404)
        .json({ status: "fail", message: "Report 2 not found" });
    }

    return res.status(200).json({ message: report2 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error from backend" });
  }
};

export { AddReport1, AddReport2, GetReport1, GetReport2 };
