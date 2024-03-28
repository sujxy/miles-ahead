import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Career_chat",
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Human", "AI"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel = mongoose.model("Career_message", messageSchema);

export default MessageModel;
