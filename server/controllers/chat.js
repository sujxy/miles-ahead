import dotenv from "dotenv";
dotenv.config();
import ChatModel from "../models/chatModel.js";
import UserModel from "../models/userModel.js";
import MessageModel from "../models/messageModel.js";
import { Report1Model, Report2Model } from "../models/reportModel.js";
//llm
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import {
  counsellor_prompt,
  skill_assessment_prompt,
} from "../prompts/prompts.js";
import codeCareerMap from "../prompts/rolemap.js";

const model = new ChatAnthropic({
  temperature: 0.9,
  modelName: "claude-3-sonnet-20240229",
  anthropicApiKey: process.env.API_KEY,
});
const counsellorTemplate = ChatPromptTemplate.fromMessages([
  ["system", counsellor_prompt],
  new MessagesPlaceholder("messages"),
]);

const skillAssessmentTemplate = ChatPromptTemplate.fromMessages([
  ["system", skill_assessment_prompt],

  new MessagesPlaceholder("messages"),
]);

const chatHistory = new ChatMessageHistory();

// const userData = {
//   summary:
//     "Based on your responses throughout our conversation, it seems that you have a strong inclination towards social and creative pursuits. You enjoy meeting new people, working in teams, and engaging in activities that involve expression and exploration of ideas.\n\nAt the same time, you appear to have a practical side, preferring to handle logistical and operational tasks, and valuing hands-on experience over structured learning environments. You tend to rely on your intuition and personal values when making decisions, rather than solely relying on objective data.\n\nOverall, your personality traits seem to align with a combination of the Enterprising (E), Artistic (A), and Realistic (R) dimensions of the Holland Codes. You have a balance between your social and creative interests, as well as a preference for practical, hands-on experiences.\n\nIt's important to note that personality assessments are not absolute, and individuals often exhibit traits from multiple dimensions. However, understanding your dominant traits can provide valuable insights into potential career paths and environments that may be a good fit for you.",
//   scores: {
//     E: 0.7,
//     A: 0.6,
//     R: 0.5,
//     I: 0.3,
//     S: 0.2,
//     C: 0.1,
//   },
// };

// function for adding Human/AI message to mongodb
async function AddMessage({ chat_id, content, type }) {
  try {
    const findChat = await ChatModel.findOne({ _id: chat_id });

    if (!findChat) {
      console.log("Chat not found to add message");
    }
    const newMessage = new MessageModel({
      chat_id,
      content,
      type,
    });

    await newMessage.save();
    console.log("Message added to MongoDB");
  } catch (error) {
    console.log("Fail to add Message to MongoDB");
    console.log(error);
  }
}

//function for adding report 1 analysis to mongodb
async function AddReport1({ user_id, chat_id, scores, content }) {
  try {
    const findChatUser = await ChatModel.findOne({
      _id: chat_id,
      user_id: user_id,
    });

    if (!findChatUser) {
      console.log("Chat or User not found");
    }

    const newReport = new Report1Model({
      user_id,
      chat_id,
      scores,
      content,
    });

    await newReport.save();
    console.log("Report 1 analysis added");
  } catch (error) {
    console.log("Error from backend in mongodb function");
    console.log(error);
  }
}

//function to add report 2 in mongodb
async function AddReport2({ user_id, chat_id, content, userOptions }) {
  try {
    const findChatUser = await ChatModel.findOne({
      _id: chat_id,
      user_id: user_id,
    });

    if (!findChatUser) {
      console.log("Chat or User not found");
    }

    const newReport = new Report2Model({
      user_id,
      chat_id,
      content,
      userOptions,
    });

    await newReport.save();
    console.log("Report 2 analysis added");
  } catch (error) {
    console.log("Error from backend");
    console.log(error);
  }
}

export const handleChat_1 = async (req, res) => {
  try {
    const { user_id, chat_id, userResponse } = req.body;
    let type = "Human";
    //calling the function to add Human message to mongodb
    let content = userResponse;
    AddMessage({ chat_id, content, type });

    // Anthropic related
    chatHistory.addMessage(new HumanMessage(userResponse));

    const chain = counsellorTemplate.pipe(model);

    const llmResponse = await chain.invoke({
      messages: await chatHistory.getMessages(),
    });

    const status = llmResponse.lc_kwargs.content
      .match(/<status>([\s\S]+?)<\/status>/)[1]
      .trim();
    content = llmResponse.lc_kwargs.content
      .match(/<content>([\s\S]+?)<\/content>/)[1]
      .trim();
    const userScores = JSON.parse(
      llmResponse.lc_kwargs.content
        .match(/<userScores>([\s\S]+?)<\/userScores>/)[1]
        .trim()
    );

    //function for adding AI message to mongodb if status is active
    type = "AI";
    if (status == "active") {
      AddMessage({ chat_id, content, type });
    } else {
      //it means report 1 is generated
      //add report 1 to mongodb
      let scores = userScores;
      AddReport1({user_id, chat_id, scores, content});
    }

    //anthropic related continue
    chatHistory.addMessage(new AIMessage(llmResponse.lc_kwargs.content));
    if (status == "completed") await chatHistory.clear();
    res.status(200).json({
      message: { status, content, userScores },
      raw: llmResponse.lc_kwargs.content,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};




export const handleChat_2 = async (req, res) => {
  try {
    const { user_id, chat_id, userResponse } = req.body;
    let type = "Human";
    //calling the function to add Human message to mongodb
    let content = userResponse;
    AddMessage({ chat_id, content, type });

    //while going to anthropic we also pass report1 (userData)
    //store it here for first time
    const userData = await Report1Model.findOne(
      { user_id: user_id },
      {},
      { sort: { createdAt: -1 } }
    );

    //Anthropic related
    chatHistory.addMessage(new HumanMessage(userResponse));

    const chain = skillAssessmentTemplate.pipe(model);

    const llmResponse = await chain.invoke({
      messages: await chatHistory.getMessages(),
      userScores: JSON.stringify(userData),
      codeCareerMap: codeCareerMap,
    });

    const status = llmResponse.lc_kwargs.content
      .match(/<status>([\s\S]+?)<\/status>/)[1]
      .trim();
    content = llmResponse.lc_kwargs.content
      .match(/<content>([\s\S]+?)<\/content>/)[1]
      .trim();
    const userOptions = JSON.parse(
      llmResponse.lc_kwargs.content
        .match(/<userOptions>([\s\S]+?)<\/userOptions>/)[1]
        .trim()
    );

    //function for adding AI message to mongodb if status is active
    type = "AI";
    if (status == "active") {
      AddMessage({ chat_id, content, type });
    } else {
      //it means report 2 is generated
      //add report 2 to mongodb
      AddReport2({ user_id, chat_id, content, userOptions });
    }

    chatHistory.addMessage(new AIMessage(llmResponse.lc_kwargs.content));
    if (status == "completed") await chatHistory.clear();
    res.status(200).json({
      message: { status, content, userOptions },
      raw: llmResponse.lc_kwargs.content,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};




//adding chat to mongodb and returning chat id 
export const AddChat = async (req, res) => {
  try {
    const { user_id, type } = req.body;
    const findUser = await UserModel.findOne({ _id: user_id });

    if (!findUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    const Conversation = new ChatModel({
      user_id,
      type,
    });
    await Conversation.save();
    res
      .status(200)
      .json({
        status: "success",
        message: "Conversation added to MongoDB",
        Conversation,
      });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Fail to add Conversation 1 to MongoDB",
    });
    console.log(error);
  }
};



//get latest chat id using user id and type of chat
export const GetLatestChatId = async (req, res) => {
  try {
    const { user_id, type } = req.body;

    // Check if user exists
    const findUser = await UserModel.findOne({ _id: user_id });
    if (!findUser) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    // Find the latest chat based on user_id and type
    const findLatestChat = await ChatModel.findOne(
      { user_id: user_id, type: type },
      {},
      { sort: { createdAt: -1 } }
    );

    if (!findLatestChat) {
      return res.status(404).json({ status: "fail", message: "Chat not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Chat ID found",
      chat_id: findLatestChat._id,
       type:findLatestChat.type
    });
  } catch (error) {
    // Handle any errors that occur during execution
    console.error("Error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

