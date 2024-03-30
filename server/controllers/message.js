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



//get all messages from mongo of specific chat and send to client
export const GetAllMessages= async(req,res)=>{
  try {
    const { chat_id } = req.body;
    const Messages = await MessageModel.find({
      chat_id: chat_id,
    });

    if (!Messages) {
      return res
        .status(404)
        .json({ status: "fail", message: "Messages not found" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Messages found", Messages });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "fail", message: "Error from backend" });
  }
}



//get all messages using user id and get latest chat
export const GetAllLatestMessages= async(req,res)=>{
  try {
    const { user_id } = req.body;

    const findLatestChatId = await ChatModel.findOne(
      { user_id: user_id},
      {},
      { sort: { createdAt: -1 } }
    );

    if (!findLatestChatId) {
      return res.status(404).json({ status: "fail", message: "Chat not found" });
    }

    const Messages = await MessageModel.find({
      chat_id: findLatestChatId,
    });

    if (!Messages) {
      return res
        .status(404)
        .json({ status: "fail", message: "Messages not found" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Messages found", Messages });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "fail", message: "Error from backend" });
  }
}