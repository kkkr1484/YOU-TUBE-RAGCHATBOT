import express from "express";
import cors from "cors";

import { askQuestion } from "./rag.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://rococo-dragon-7d7cf5.netlify.app",
      "http://localhost:5173",
      "http://localhost:3000"
    ],
    credentials: true,
  })
);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});