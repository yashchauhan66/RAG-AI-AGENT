import { embeddings } from "../embeddings/embeddingModel.js";
import { connectDB } from "../config/mongo.js";

export const searchSimilarChunks = async (query, limit = 3) => {

  const db = await connectDB();

  const collection = db.collection("documents");

  const queryVector = await embeddings.embedQuery(query);

  const documents = await collection.find({}).toArray();

  const scoredDocs = documents.map(doc => {

    const score = cosineSimilarity(queryVector, doc.embedding);

    return {
      text: doc.text,
      score
    };

  });

  scoredDocs.sort((a, b) => b.score - a.score);

  return scoredDocs.slice(0, limit);

};

function cosineSimilarity(vecA, vecB) {

  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);

  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));

  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));

  return dotProduct / (magnitudeA * magnitudeB);

}