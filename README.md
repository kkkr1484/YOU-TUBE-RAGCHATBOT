# YouTube RAG Chatbot

This project is a simple Retrieval-Augmented Generation (RAG) chatbot that can answer questions based on the transcript of a YouTube video.

I built it to understand how modern AI applications combine vector search, embeddings, and large language models to answer questions using external knowledge instead of relying only on the model's training data.

# Project demo
![alt text](home.png)

## What it does

- Fetches transcript data from a YouTube video
- Converts transcript chunks into embeddings
- Stores and searches relevant chunks using a vector store
- Retrieves the most relevant context for a question
- Uses an LLM through OpenRouter to generate answers

## Tech Stack

Frontend:
- React
- Vite
- Axios

Backend:
- Node.js
- Express.js

AI:
- LangChain
- OpenRouter
- Vector Embeddings

## Project Structure

```
RAG-CHATBOT
├── frontend
├── server
│   ├── server.js
│   ├── rag.js
│   ├── embeddings.js
│   └── getTranscript.js
└── README.md
```

## Running the Project

### Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
OPENROUTER_API_KEY=your_api_key
```

Start the server:

```bash
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

The backend API will run on:

```text
http://localhost:3000
```

## Example Question

```
Explain RAG in simple words
```

The chatbot retrieves relevant transcript chunks and uses them as context before generating the answer.

## Why I Built This

I wanted to learn:

- How RAG pipelines work
- Embedding generation and retrieval
- LangChain fundamentals
- Building full-stack AI applications
- Connecting LLMs with external knowledge sources

## Future Improvements

- Support multiple videos
- Chat history
- Source citations
- Better UI
- Pinecone integration
- Deployment

## Author
Komal Kumari

GitHub: https://github.com/kkkr1484

LinkedIn: https://www.linkedin.com/in/komal-kumari-795319298