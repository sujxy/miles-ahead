// server.js

import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { MessagesPlaceholder } from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: OPENAI_API_KEY,
  stripNewLines: false,
});
const chatModel = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY });

const splitter = new RecursiveCharacterTextSplitter();
const loader = new PDFLoader("./data/PersonalityBackgroundpdf.pdf");
const docs = await loader.load();
const splitDocs = await splitter.splitDocuments(docs);
const vectorstore = await MemoryVectorStore.fromDocuments(
  splitDocs,
  embeddings
);

let chatHistory = [];

const retriever = vectorstore.asRetriever();
const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Pick one by one question from given context and ask to me. Do not repeat the same question.  Context- ::\n\n{context}",
  ],
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
]);

const historyAwareCombineDocsChain = await createStuffDocumentsChain({
  llm: chatModel,
  prompt: historyAwareRetrievalPrompt,
});

const conversationalRetrievalChain = await createRetrievalChain({
  combineDocsChain: historyAwareCombineDocsChain,
  retriever,
});

app.post("/chat", async (req, res) => {
  try {
    // console.log("Recieved request");
    const { input } = req.body;
    chatHistory.push(new HumanMessage(input));
    // console.log("First step completed");

    console.log("Awating response from openai");
    const response = await conversationalRetrievalChain.invoke({
      chat_history: chatHistory,
      input,
    });

    chatHistory.push(new AIMessage(response.answer));

    // console.log("sending response to frontend");
    res.send({ answer: response.answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // console.log("respose send");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
