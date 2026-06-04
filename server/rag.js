import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

import { vectorStore, videoId } from "./embeddings.js";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const retrieveTool = tool(
  async ({ query }) => {
    const retrievedDocs =
      await vectorStore.similaritySearch(
        query,
        3,
        (doc) =>
          doc.metadata.video_id === videoId
      );

    return retrievedDocs
      .map(doc => doc.pageContent)
      .join("\n\n");
  },
  {
    name: "retrieve",
    description:
      "Retrieve relevant transcript chunks",
    schema: z.object({
      query: z.string(),
    }),
  }
);

export async function askQuestion(
  question
) {
  const context =
    await retrieveTool.invoke({
      query: question,
    });

  const response =
    await client.chat.completions.create({
      model:
        "meta-llama/llama-3.1-8b-instruct",
      messages: [
        {
          role: "user",
          content: `
Context:
${context}

Question:
${question}

Answer only using the provided context.
`,
        },
      ],
    });

  return response
    .choices[0]
    .message
    .content;
}