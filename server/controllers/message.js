import MessageModel from "../models/messageModel.js";
import ChatModel from "../models/chatModel.js";

//adding message to mongodb
export const AddMessage = async (req, res) => {
  try {
    const { chat_id, content, type } = req.body;
    const findChat = await ChatModel.findOne({ _id: chat_id });

    if (!findChat) {
      return res
        .status(404)
        .json({ status: "fail", message: "Chat not found to add message" });
    }

    const newMessage = new MessageModel({
      chat_id,
      content,
      type,
    });

    await newMessage.save();
    res
      .status(200)
      .json({ status: "success", message: "Message added to MongoDB" });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Fail to add Message to MongoDB",
    });
    console.log(error);
  }
};
