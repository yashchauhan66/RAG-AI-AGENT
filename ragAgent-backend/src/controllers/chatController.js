import { ragAgent } from "../services/ragAgent.js";

export async function chatController(req, res) {

  try {

    const { sessionId, message, question } = req.body;
    const query = message || question;

    if (!sessionId || !query) {
      return res.status(400).json({ error: "sessionId and message/question required" });
    }


    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    await ragAgent(sessionId, query, res);

  } catch (error) {

    console.error("Chat error:", error);

    res.status(500).send("Chat failed");

  }

}