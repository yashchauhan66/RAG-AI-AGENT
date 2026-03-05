import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const hf = new HfInference(process.env.HF_API_KEY);

export async function generateEmbedding(text) {
  try {
    const embedding = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });

    
    return Array.from(embedding);

  } catch (error) {
    console.error("Embedding Error:", error.message);
    throw new Error("Failed to generate embedding: " + error.message);
  }
}
