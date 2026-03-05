export const ragPrompt = (context, question) => {

return `
You are an AI assistant.

Use ONLY the provided context to answer the question.

If the answer is not in the context, say:
"I don't know based on the provided documents."

Context:
${context}

Question:
${question}

Answer:
`;

};