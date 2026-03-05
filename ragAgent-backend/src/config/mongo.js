import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
   console.error("Critical: MONGO_URI is not defined in .env file");
}

let client = null;
let db = null;

export const connectDB = async () => {
   try {
      if (db && mongoose.connection.readyState === 1) return db;

      if (!uri) throw new Error("MONGO_URI is missing");

      console.log(" Connecting to MongoDB...");

      
      client = new MongoClient(uri);
      await client.connect();
      db = client.db("langchainDB");


      await mongoose.connect(uri, { dbName: "langchainDB" });

      console.log(" Connected to MongoDB & Mongoose successfully");
      return db;
   } catch (err) {
      console.error(" MongoDB Connection Error:", err.message);
      throw err;
   }
};

export const closeDB = async () => {
   if (client) {
      await client.close();
      client = null;
   }
   if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
   }
   db = null;
   console.log(" MongoDB connections closed");
};