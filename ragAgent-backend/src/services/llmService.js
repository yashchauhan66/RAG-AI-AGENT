import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateLLMResponse(prompt) {
  try {

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 800,
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error("LLM Error:", error);
    throw new Error("Failed to generate response");
  }
}