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
    console.log("Retrieving docs for query:");
    console.log(query);

    const retrievedDocs =
      await vectorStore.similaritySearch(
        query,
        3,
        (doc) =>
          doc.metadata.video_id === videoId
      );

    // console.log(
    //   retrievedDocs.map(
    //     (doc) => doc.metadata
    //   )
    // );

    const serializedDocs =
      retrievedDocs
        .map((doc) => doc.pageContent)
        .join("\n\n");

    return serializedDocs;
  },
  {
    name: "retrieve",
    description:
      "Retrieve the most relevant chunks from the YouTube transcript",
    schema: z.object({
      query: z.string(),
    }),
  }
);

const question =
  process.argv.slice(2).join(" ");

const context =
  await retrieveTool.invoke({
    query: question,
  });

const response =
  await client.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct",
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

console.log("\n===== AI Answer =====\n");
console.log(
  response.choices[0].message.content
);