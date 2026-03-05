import Groq from "groq-sdk";
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

async function test() {
    console.log("Testing Groq...");
    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: "hi" }],
        });
        console.log("Groq OK:", completion.choices[0].message.content);
    } catch (e) {
        console.error("Groq Failed with:", e.status, e.message);
    }

    console.log("\nTesting HF...");
    try {
        const hf = new HfInference(process.env.HF_API_KEY);
        const embedding = await hf.featureExtraction({
            model: "sentence-transformers/all-MiniLM-L6-v2",
            inputs: "hi",
        });
        console.log("HF OK (length):", embedding.length);
    } catch (e) {
        console.error("HF Failed with:", e.status, e.message);
    }
}

test();
