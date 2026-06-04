import express from "express";
import cors from "cors";

import { askQuestion } from "./rag.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "RAG API Running",
  });
});

app.post("/generate", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Question is required",
      });
    }

    const answer = await askQuestion(question);

    res.json({
      answer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(3000, () => {
  console.log(
    "🚀 Server running at http://localhost:3000"
  );
});