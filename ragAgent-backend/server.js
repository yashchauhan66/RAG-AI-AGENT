import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB, closeDB } from "./src/config/mongo.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import ingestRoutes from "./src/routes/ingestRoutes.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  message: "Wait kre , api ke passe cut te hai"
});

app.use(limiter);


app.use(express.static(path.join(__dirname, "public")));


app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", chatRoutes);
app.use("/api", ingestRoutes);


const PORT = process.env.PORT || 5000;

async function startServer() {
  try {

    await connectDB();

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
      console.log(` Chat API  → POST http://localhost:${PORT}/api/chat`);
      console.log(` Ingest API → POST http://localhost:${PORT}/api/ingest`);
      console.log(` Chat UI   → http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error(" Failed to start server:", err.message);
    process.exit(1);
  }
}

process.on("SIGTERM", async () => {
  console.log("SIGTERM received — shutting down gracefully...");
  await closeDB();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log(" SIGINT received — shutting down gracefully...");
  await closeDB();
  process.exit(0);
});

startServer();