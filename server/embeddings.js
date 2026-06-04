import { YoutubeTranscript } from "youtube-transcript";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const videoUrl =
  "https://youtu.be/d-VKYF4Zow0?si=6vK56aBTA8bVkk_O";

const videoId = "d-VKYF4Zow0";

const transcript =
  await YoutubeTranscript.fetchTranscript(videoUrl);

const fullTranscript =
  transcript.map(item => item.text).join(" ");

const docs = [
  new Document({
    pageContent: fullTranscript,
    metadata: {
      video_id: videoId,
    },
  }),
];

const splitter =
  new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

const chunks =
  await splitter.splitDocuments(docs);

chunks.forEach(chunk => {
  chunk.metadata.video_id = videoId;
});

const embeddings =
  new HuggingFaceTransformersEmbeddings({
    model: "Xenova/all-MiniLM-L6-v2",
  });

const vectorStore =
  new MemoryVectorStore(embeddings);

await vectorStore.addDocuments(chunks);

export {
  vectorStore,
  videoId,
};