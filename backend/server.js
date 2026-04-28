import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("⚠️ WARNING: GEMINI_API_KEY is not set in the environment variables!");
  console.warn("⚠️ Please create a .env file in the backend folder and add your API key.");
}
const genAI = new GoogleGenerativeAI(apiKey || "dummy_key");

app.post("/chat", async (req, res) => {
  if (!apiKey) {
    return res.status(500).json({ error: "API key is missing. Please add GEMINI_API_KEY to your .env file." });
  }
  console.log("Request received:", req.body);
  try {
    const { messages } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: "You are StartSmart AI, a career advisor. Ask questions and guide users step-by-step. Help students choose career domains like AI, Data Science, UI/UX clearly."
    });

    const latestMessage = messages[messages.length - 1].content;
    
    // Map previous messages to Gemini format
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Gemini API requires the history to always start with a 'user' message.
    // If the history starts with a 'model' message (like our initial greeting), we prepend a dummy 'user' message.
    if (history.length > 0 && history[0].role === 'model') {
      history.unshift({ role: 'user', parts: [{ text: 'Hello' }] });
    }

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(latestMessage);

    res.json({
      reply: result.response.text(),
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch response from Gemini" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
