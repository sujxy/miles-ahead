import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import defaultRouter from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(morgan("common"));
app.use(cors());

app.use("/api/v1", defaultRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `LangChain Express app listening at http://localhost:${port}`,
      );
    });
  })
  .catch((e) => console.log(`error connecting to db : ${e}`));

// app.listen(port, () => {
//   console.log(`LangChain Express app listening at http://localhost:${port}`);
// });
