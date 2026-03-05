import { generateLLMResponse } from "./llmService.js";

export async function rewriteQuery(question, chatHistory) {

  const historyText = chatHistory
    .map(msg => `${msg.role}: ${msg.content}`)
    .join("\n");

  const prompt = `
You are an AI that improves search queries.

Rewrite the user's question so it is clear and standalone.

Chat History:
${historyText}

User Question:
${question}

Rewritten Search Query:
`;

  const rewrittenQuery = await generateLLMResponse(prompt);

  return rewrittenQuery.trim();
}