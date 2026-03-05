
import { generateEmbedding } from "./embeddingService.js";
import { connectDB } from "../config/mongo.js";


import Document from "../models/Document.js";
import { cosineSimilarity } from "../utils/cosinesSimilarity.js";


export const storeChunks = async (chunks) => {

    for (const chunk of chunks) {
        await Document.create({
            text: chunk,
            embedding: await generateEmbedding(chunk),
            metadata: { createdAt: new Date() }
        });
    }

    console.log(` Stored ${chunks.length} chunks in MongoDB`);
};

export const searchVector = async (queryEmbedding, limit = 5) => {
    const db = await connectDB();
    const collection = db.collection("documents");

    const documents = await collection.find({}).toArray();

    if (documents.length === 0) {
        return [];
    }

    const scoredDocs = documents
        .filter(doc => doc.embedding && Array.isArray(doc.embedding))
        .map(doc => ({
            text: doc.text,
            score: cosineSimilarity(queryEmbedding, doc.embedding),
        }));

    scoredDocs.sort((a, b) => b.score - a.score);

    return scoredDocs.slice(0, limit);
};
