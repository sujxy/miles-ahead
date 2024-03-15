import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

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
} from "./prompts/prompts.js";
import codeCareerMap from "./prompts/rolemap.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(morgan("common"));
app.use(cors());

const chatHistory = new ChatMessageHistory();

const userData = {
  summary:
    "Based on your responses throughout our conversation, it seems that you have a strong inclination towards social and creative pursuits. You enjoy meeting new people, working in teams, and engaging in activities that involve expression and exploration of ideas.\n\nAt the same time, you appear to have a practical side, preferring to handle logistical and operational tasks, and valuing hands-on experience over structured learning environments. You tend to rely on your intuition and personal values when making decisions, rather than solely relying on objective data.\n\nOverall, your personality traits seem to align with a combination of the Enterprising (E), Artistic (A), and Realistic (R) dimensions of the Holland Codes. You have a balance between your social and creative interests, as well as a preference for practical, hands-on experiences.\n\nIt's important to note that personality assessments are not absolute, and individuals often exhibit traits from multiple dimensions. However, understanding your dominant traits can provide valuable insights into potential career paths and environments that may be a good fit for you.",
  scores: {
    E: 0.7,
    A: 0.6,
    R: 0.5,
    I: 0.3,
    S: 0.2,
    C: 0.1,
  },
};

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

app.post("/p1/question", async (req, res) => {
  try {
    const { userResponse } = req.body;
    chatHistory.addMessage(new HumanMessage(userResponse));

    const chain = counsellorTemplate.pipe(model);

    const llmResponse = await chain.invoke({
      messages: await chatHistory.getMessages(),
    });

    const status = llmResponse.lc_kwargs.content
      .match(/<status>([\s\S]+?)<\/status>/)[1]
      .trim();
    const content = llmResponse.lc_kwargs.content
      .match(/<content>([\s\S]+?)<\/content>/)[1]
      .trim();
    const userScores = JSON.parse(
      llmResponse.lc_kwargs.content
        .match(/<userScores>([\s\S]+?)<\/userScores>/)[1]
        .trim(),
    );
    chatHistory.addMessage(new AIMessage(llmResponse.lc_kwargs.content));
    if (status == "completed") await chatHistory.clear();
    res.status(200).json({
      message: { status, content, userScores },
      raw: llmResponse.lc_kwargs.content,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/p2/question", async (req, res) => {
  try {
    const { userResponse } = req.body;
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
    const content = llmResponse.lc_kwargs.content
      .match(/<content>([\s\S]+?)<\/content>/)[1]
      .trim();
    const userOptions = JSON.parse(
      llmResponse.lc_kwargs.content
        .match(/<userOptions>([\s\S]+?)<\/userOptions>/)[1]
        .trim(),
    );
    chatHistory.addMessage(new AIMessage(llmResponse.lc_kwargs.content));
    if (status == "completed") await chatHistory.clear();
    res.status(200).json({
      message: { status, content, userOptions },
      raw: llmResponse.lc_kwargs.content,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`LangChain Express app listening at http://localhost:${port}`);
});
