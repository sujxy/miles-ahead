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
import { college_prompt } from "../prompts/prompts.js";

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

const userData = {
  summary: "",
  scores: null,
};

// function for adding Human/AI message to mongodb
async function addMessage({ chat_id, content, type }) {
  try {
    const findChat = await ChatModel.findOne({ _id: chat_id });

    if (!findChat) {
      console.log("Chat not found to add message");
    }
    const newMessage = await MessageModel.create({
      chat_id,
      content,
      type,
    });
    console.log("Message added to MongoDB");
    return Promise.resolve();
  } catch (error) {
    console.log("Fail to add Message to MongoDB");
    console.log(error.message);
    return Promise.reject();
  }
}

//function for adding report 1 analysis to mongodb
async function addReport1({ user_id, chat_id, scores, content }) {
  try {
    const findChatUser = await ChatModel.findOne({
      _id: chat_id,
      user_id: user_id,
    });

    if (!findChatUser) {
      console.log("Chat or User not found");
    }

    const newReport = await Report1Model.create({
      user_id,
      chat_id,
      scores,
      content,
    });
    console.log("Report 1 analysis added");
    return Promise.resolve();
  } catch (error) {
    console.log("Error from backend in mongodb function");
    console.log(error.message);
    return Promise.reject();
  }
}

//function to add report 2 in mongodb
async function addReport2({ user_id, chat_id, content, userOptions }) {
  try {
    const newReport = await Report2Model.create({
      user_id,
      chat_id,
      content,
      userOptions,
    });

    console.log("Report 2 analysis added");
    return Promise.resolve();
  } catch (error) {
    console.log("Error from in report 2");
    return Promise.reject();
  }
}

export const handleChat_1 = async (req, res) => {
  try {
    const user_id = req.userId;
    const { chat_id, userResponse, type } = req.body;

    // Anthropic related
    chatHistory.addMessage(new HumanMessage(userResponse));

    const chain = counsellorTemplate.pipe(model);

    const llmResponse = await chain.invoke({
      messages: await chatHistory.getMessages(),
    });

    const status = llmResponse.lc_kwargs.content
      .match(/<status>([\s\S]+?)<\/status>/)[1]
      .trim();
    const llm_content = llmResponse.lc_kwargs.content
      .match(/<content>([\s\S]+?)<\/content>/)[1]
      .trim();
    const userScores = JSON.parse(
      llmResponse.lc_kwargs.content
        .match(/<userScores>([\s\S]+?)<\/userScores>/)[1]
        .trim(),
    );

    //calling the function to add Human message to mongodb
    await addMessage({ chat_id, content: userResponse, type: "Human" });
    await addMessage({ chat_id, content: llm_content, type: "AI" });

    //anthropic related continue
    chatHistory.addMessage(new AIMessage(llmResponse.lc_kwargs.content));

    if (status == "completed") {
      await chatHistory.clear();
      await addReport1({
        user_id,
        chat_id,
        scores: userScores,
        content: llm_content,
      });
    }

    res.status(200).json({
      message: { status, content: llm_content, userScores },
      raw: llmResponse.lc_kwargs.content,
      chatId: chat_id,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "error answering question" });
  }
};

export const handleChat_2 = async (req, res) => {
  try {
    const user_id = req.userId;
    const { chat_id, userResponse, type } = req.body;

    //while going to anthropic we also pass report1 (userData)
    //store it here for first time
    const userData = await Report1Model.findOne(
      { user_id: user_id },
      {},
      { sort: { createdAt: -1 } },
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
    const llm_content = llmResponse.lc_kwargs.content
      .match(/<content>([\s\S]+?)<\/content>/)[1]
      .trim();
    const userOptions = JSON.parse(
      llmResponse.lc_kwargs.content
        .match(/<userOptions>([\s\S]+?)<\/userOptions>/)[1]
        .trim(),
    );

    //calling the function to add Human message to mongodb
    await addMessage({ chat_id, content: userResponse, type: "Human" });
    //function for adding AI message to mongodb if status is
    await addMessage({ chat_id, content: llm_content, type: "AI" });

    //ad message to chat history
    chatHistory.addMessage(new AIMessage(llmResponse.lc_kwargs.content));
    if (status == "completed") {
      //if completed then add the response to report
      await addReport2({ user_id, chat_id, content: llm_content, userOptions });
      await chatHistory.clear();
    }
    res.status(200).json({
      message: { status, content: llm_content, userOptions },
      raw: llmResponse.lc_kwargs.content,
      chatId: chat_id,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//adding chat to mongodb and returning chat id
// export const AddChat = async (req, res) => {
//   try {
//     const user_id = req.userId;
//     const { type } = req.body;
//     const findUser = await UserModel.findOne({ _id: user_id });

//     if (!findUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const conversation = await ChatModel.create({
//       user_id,
//       type,
//     });

//     res.status(200).json({ message: conversation });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

//get latest chat id using user id and type of chat
// export const GetLatestChatId = async (req, res) => {
//   try {
//     const { user_id, type } = req.body;

//     // Check if user exists
//     const findUser = await UserModel.findOne({ _id: user_id });
//     if (!findUser) {
//       return res
//         .status(404)
//         .json({ status: "fail", message: "User not found" });
//     }

//     // Find the latest chat based on user_id and type
//     const findLatestChat = await ChatModel.findOne(
//       { user_id: user_id, type: type },
//       {},
//       { sort: { createdAt: -1 } },
//     );

//     if (!findLatestChat) {
//       return res
//         .status(404)
//         .json({ status: "fail", message: "Chat not found" });
//     }

//     return res.status(200).json({
//       status: "success",
//       message: "Chat ID found",
//       chat_id: findLatestChat._id,
//       type: findLatestChat.type,
//     });
//   } catch (error) {
//     // Handle any errors that occur during execution
//     console.error("Error:", error);
//     return res
//       .status(500)
//       .json({ status: "error", message: "Internal server error" });
//   }
// };

//phase 3 jobs
import axios from "axios";

export const GetJobs = async (req, res) => {
  const field = req.body;
  const url = "https://api.scrapingdog.com/linkedinjobs/";
  const params = {
    api_key: "65f42b4be698b20a9dff912a",
    field: field,
    geoid: "100293800",
    page: 1,
  };

  try {
    // Send a GET request with the parameters
    const response = await axios.get(url, { params });

    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      // Extract the relevant data from the response
      const data = response.data;
      // console.log(data);

      // Send the extracted data in the JSON response
      res.status(200).json({ data });
    } else {
      console.log("Request failed with status code:", response.status);
      res.status(response.status).json({ error: "Request failed" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Phase 3 colleges

export const GetColleges = async (req, res) => {
  const { field, location, fees, age } = req.body;

  const collegeTemplate = ChatPromptTemplate.fromMessages([
    ["system", college_prompt],
    [
      "user",
      `I am looking for ${field} colleges in ${location} with fees around ${fees} for someone aged ${age}`,
    ],
  ]);

  const chain = collegeTemplate.pipe(model);

  try {
    const response = await chain.invoke({ field, location, fees, age });

    if (response) {
      const responseString = response.lc_kwargs.content;

      // Extract the response content
      const responseContent = responseString.match(
        /<response>(.*)<\/response>/s,
      )[1];

      // Function to extract college details
      const extractCollegeDetails = (collegeTag) => {
        const collegeDetails = collegeTag.match(
          /<college_name>(.*?)<\/college_name>|<college_website_link>(.*?)<\/college_website_link>|<college_fees>(.*?)<\/college_fees>|<college_address>(.*?)<\/college_address>/g,
        );
        const [collegeName, collegeWebsiteLink, collegeFees, collegeAddress] =
          collegeDetails.map((detail) =>
            detail.replace(
              /<\/?college_name>|<\/?college_website_link>|<\/?college_fees>|<\/?college_address>/g,
              "",
            ),
          );

        return {
          collegeName,
          collegeWebsiteLink,
          collegeFees,
          collegeAddress,
        };
      };

      // Extract details for each college
      const collegeDetails = [
        extractCollegeDetails(
          responseContent.match(/<college1>(.*?)<\/college1>/s)[0],
        ),
        extractCollegeDetails(
          responseContent.match(/<college2>(.*?)<\/college2>/s)[0],
        ),
        extractCollegeDetails(
          responseContent.match(/<college3>(.*?)<\/college3>/s)[0],
        ),
        extractCollegeDetails(
          responseContent.match(/<college4>(.*?)<\/college4>/s)[0],
        ),
        extractCollegeDetails(
          responseContent.match(/<college5>(.*?)<\/college5>/s)[0],
        ),
      ];

      res.status(200).json({ collegeDetails });
    } else {
      console.log("Request failed with status code:", response.status);
      res.status(response.status).json({ error: "Request failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
