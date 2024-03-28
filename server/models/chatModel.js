import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Career_user",
  },
  type: {
    type: String,
    enum: ["assessment_1", "assessment_2"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatModel = mongoose.model("Career_chat", chatSchema);
export default ChatModel;
