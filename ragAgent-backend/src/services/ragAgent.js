import { generateEmbedding } from "./embeddingService.js";
import { buildPrompt } from "../prompts/promptBuilder.js";
import { addMessage, getHistory } from "./chatHistoryService.js";
import redisClient from "../redis/redis.js";
import { runAgent } from "./agentService.js";
import { rewriteQuery } from "./queryRewriteService.js";
import { rerankDocuments } from "./rerankerService.js";
import { streamLLMResponse } from "./llmStreamService.js";
import { hybridSearch } from "../retriever/hybridSearch.js";

export async function ragAgent(sessionId, question, res) {

  try {

    const toolResult = await runAgent(question);

    if (toolResult !== null && toolResult !== undefined) {
      if (!res.headersSent) {
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Transfer-Encoding", "chunked");
      }
      res.write(String(toolResult));
      res.end();
      return;
    }

    const cacheKey = `rag:${question}`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {

      console.log("Cache Hit");

      addMessage(sessionId, "user", question);
      addMessage(sessionId, "assistant", cached);

      if (!res.headersSent) {
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Transfer-Encoding", "chunked");
      }
      res.write(String(cached));
      res.end();

      return;
    }

    console.log("Cache Miss");

    addMessage(sessionId, "user", question);

    const chatHistory = getHistory(sessionId) || [];

    const betterQuery = await rewriteQuery(question, chatHistory);

    const queryEmbedding = await generateEmbedding(betterQuery);

    const docs = await hybridSearch(queryEmbedding, betterQuery);

    const bestDocs = rerankDocuments(question, docs);

    const prompt = buildPrompt(question, bestDocs, chatHistory);

    const answer = await streamLLMResponse(prompt, res);

    addMessage(sessionId, "assistant", answer);

    await redisClient.set(cacheKey, answer, { EX: 3600 });

  } catch (error) {

    console.error("RAG Agent Error:", error.stack || error.message);

    if (!res.headersSent) {
      res.status(500).send("RAG processing failed: " + error.message);
    } else {
      res.write("\n[Error occurred during processing]");
      res.end();
    }

  }

}