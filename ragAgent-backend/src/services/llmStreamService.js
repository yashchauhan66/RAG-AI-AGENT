import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export async function streamLLMResponse(prompt, res) {

    const stream = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            { role: "user", content: prompt }
        ],
        stream: true
    });

    let fullAnswer = "";

    for await (const chunk of stream) {

        const token = chunk.choices[0]?.delta?.content || "";

        fullAnswer += token;

        res.write(token);
    }

    res.end();

    return fullAnswer;
}