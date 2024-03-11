import express from "express";
import dotnv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(morgan("common"));
app.use(cors());

app.post("/generate", async (req, res) => {
  try {
    // Assuming LangChain API endpoint and your API key are defined
    const langChainApi = "https://api.langchain.io/generate";
    const apiKey = "ls__4076d13121b441f1b7f68d82de72c4c7";

    // Extract the prompt from the request body
    const prompt = req.body.prompt;

    // Make a request to LangChain with the prompt
    const response = await axios.post(
      langChainApi,
      {
        prompt: prompt,
        // Add any other required parameters for LangChain here
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    // Extract the generated text from the response
    const generatedText = response.data.generatedText;

    // Send the generated text back as the response
    res.json({ generatedText: generatedText });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Failed to generate text" });
  }
});

app.post("/question", async (req, res) => {
  try {
    res.status(200).json({ message: "llm response" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`LangChain Express app listening at http://localhost:${port}`);
});
