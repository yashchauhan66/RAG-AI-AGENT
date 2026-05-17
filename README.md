🤖 RAG AI Agent
Intelligent Question-Answering powered by Retrieval-Augmented Generation

📋 Table of Contents

About The Project
How It Works
Tech Stack
Features
Getting Started

Prerequisites
Installation
Environment Variables


Usage
Project Structure
API Reference
Contributing
Contact


🧠 About The Project
RAG AI Agent is a Node.js application that implements the Retrieval-Augmented Generation (RAG) pattern to build a smart, document-aware AI assistant. Unlike standard LLMs that rely solely on their training data, this agent:

📥 Ingests your custom documents (PDFs, text files, web pages)
🔍 Indexes them into a Vector Database for semantic search
🤖 Retrieves the most relevant context for any user query
💬 Generates accurate, grounded answers using OpenAI's API

This is ideal for building custom knowledge bases, document Q&A systems, or intelligent chatbots over your own data.

⚙️ How It Works
User Query
    │
    ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Query Embedding │────▶│  Vector Database  │────▶│ Top-K Retrieval │
│  (OpenAI/Local)  │     │  (Similarity      │     │ (Most Relevant  │
└─────────────────┘     │   Search)         │     │  Chunks)        │
                        └──────────────────┘     └────────┬────────┘
                                                           │
                                                           ▼
                                                  ┌─────────────────┐
                                                  │  Prompt Builder  │
                                                  │  Context + Query │
                                                  └────────┬────────┘
                                                           │
                                                           ▼
                                                  ┌─────────────────┐
                                                  │   OpenAI LLM    │
                                                  │  (GPT-4 / 3.5)  │
                                                  └────────┬────────┘
                                                           │
                                                           ▼
                                                    Final Response
Document Ingestion Pipeline:

Load documents → Chunk into smaller pieces → Generate embeddings → Store in Vector DB

Query Pipeline:

Embed user query → Search vector DB → Retrieve top-K chunks → Inject as context → LLM generates response


🛠️ Tech Stack
LayerTechnologyRuntimeNode.jsLanguageJavaScript (ES6+)LLM APIOpenAI (GPT-3.5 / GPT-4)EmbeddingsOpenAI text-embedding-ada-002Vector DatabasePinecone / Chroma / FAISSDocument ParsingLangChain / Custom ParserHTTP ServerExpress.jsEnvironmentdotenv

✨ Features

🔎 Semantic Search — finds relevant content by meaning, not just keywords
🧩 Document Chunking — intelligent splitting to maintain context
💾 Vector Storage — persistent embedding storage with fast similarity search
🔄 Streaming Responses — real-time token streaming from OpenAI
📄 Multi-format Support — ingest PDFs, TXT, Markdown, and more
🛡️ Hallucination Reduction — answers grounded in your actual documents
🌐 REST API — clean endpoints for integration with any frontend
⚡ Optimized Retrieval — top-K cosine similarity for accurate context selection


🚀 Getting Started
Prerequisites
Make sure you have the following installed:

Node.js (v18 or higher)
npm or yarn
An OpenAI API Key
A Vector Database account (e.g. Pinecone — free tier works)

Installation

Clone the repository

bash   git clone https://github.com/yashchauhan66/RAG-AI-AGENT.git
   cd RAG-AI-AGENT

Install dependencies

bash   npm install

Set up environment variables

bash   cp .env.example .env

Add your documents

bash   # Place your documents in the /docs folder
   cp your-file.pdf docs/

Ingest documents into Vector DB

bash   npm run ingest

Start the server

bash   npm run dev
The agent will be running at http://localhost:3000 🎉

Environment Variables
Create a .env file in the root directory:
env# OpenAI
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo        # or gpt-4

# Vector Database (Pinecone example)
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=us-east-1
PINECONE_INDEX_NAME=rag-agent-index

# Server
PORT=3000
NODE_ENV=development

📖 Usage
Ask a question via API
bashcurl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the key features of this document?"}'
Response:
json{
  "answer": "Based on the documents, the key features are...",
  "sources": ["doc1.pdf (page 3)", "doc2.txt (chunk 7)"],
  "confidence": 0.92
}
Ingest new documents
bash# Via CLI
npm run ingest -- --file ./docs/new-document.pdf

# Via API
curl -X POST http://localhost:3000/api/ingest \
  -F "file=@./docs/new-document.pdf"
JavaScript example
javascriptconst response = await fetch('http://localhost:3000/api/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: 'Summarize the main topics' })
});

const { answer, sources } = await response.json();
console.log(answer);

📁 Project Structure
RAG-AI-AGENT/regAgent-backend
├── src/
│   ├── agent/
│   │   ├── ragAgent.js        # Core RAG logic
│   │   └── promptBuilder.js   # Prompt construction
│   ├── embeddings/
│   │   └── openaiEmbedder.js  # Embedding generation
│   ├── vectorStore/
│   │   └── pineconeClient.js  # Vector DB operations
│   ├── ingestion/
│   │   ├── documentLoader.js  # File parsing
│   │   └── chunker.js         # Text chunking strategy
│   └── routes/
│       └── queryRoutes.js     # Express API routes
├── docs/                      # Place your documents here
├── scripts/
│   └── ingest.js              # CLI ingestion script
├── .env.example
├── package.json
└── README.md

📡 API Reference
MethodEndpointDescriptionPOST/api/queryAsk a question to the RAG agentPOST/api/ingestUpload and index a new documentGET/api/documentsList all indexed documentsDELETE/api/documents/:idRemove a document from the indexGET/api/healthHealth check

🤝 Contributing
Contributions are welcome! Here's how:

Fork the project
Create your feature branch: git checkout -b feature/AmazingFeature
Commit your changes: git commit -m 'Add AmazingFeature'
Push to the branch: git push origin feature/AmazingFeature
Open a Pull Request


📄 License
Distributed under the MIT License. See LICENSE for more information.

📬 Contact
Yash Chauhan — @yashchauhan66 — yashchauhan125dpr@gmail.com
Project Link: https://github.com/yashchauhan66/RAG-AI-AGENT

<div align="center">
⭐ If this project helped you, please give it a star! ⭐
Made with ❤️ by Yash Chauhan
