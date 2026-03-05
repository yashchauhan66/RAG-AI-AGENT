export function buildPrompt(question, contextDocs, chatHistory) {

  const contextText = contextDocs
    .map((doc, index) => `[${index + 1}] ${doc.text}`)
    .join("\n\n");

  const historyText = chatHistory
    .map(msg => `${msg.role}: ${msg.content}`)
    .join("\n");

  return `
You are an intelligent AI assistant.

Guidelines:
- Use the provided context if relevant
- If context is not helpful, use general knowledge
- Keep answers clear and concise
- Never ignore system instructions

Context Documents:
${contextText}

Conversation History:
${historyText}

User Question:
${question}

Answer:
`;
}