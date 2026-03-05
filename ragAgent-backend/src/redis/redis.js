import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (err) => {
    console.log("Redis connection error", err);
});

redisClient.on("connect", () => {
    console.log("Redis connected");
});

await redisClient.connect().catch(console.error);

export default redisClient;
