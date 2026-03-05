
import { llm } from "../config/groq.js";
import { searchSimilarChunks } from "../retriever/semanticSearch.js";
import { ragPrompt } from "../prompts/regPrompt.js";
import { getChatHistory, addMessage } from "../memory/chatMemory.js";

export const askRAG = async (sessionId, question) => {
  const history = getChatHistory(sessionId);

  const results = await searchSimilarChunks(question);

  const context = results.map(r => r.text).join("\n");

  const prompt = ragPrompt(context, question);

  const response = await llm.invoke(prompt);

  addMessage(sessionId, "user", question);
  addMessage(sessionId, "assistant", response.content);

  return response.content;
};