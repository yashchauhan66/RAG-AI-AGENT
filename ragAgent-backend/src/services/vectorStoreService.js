import { embeddings } from "../embeddings/embeddingModel.js";
import { connectDB } from "../config/mongo.js";

export const storeChunks = async (chunks) => {

  const db = await connectDB();

  const collection = db.collection("documents");

  for (const chunk of chunks) {

    const vector = await embeddings.embedQuery(chunk);

    await collection.insertOne({
      text: chunk,
      embedding: vector
    });

  }

};