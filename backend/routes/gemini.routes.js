const express = require("express");
const { GoogleGenAI } = require("@google/genai")
require('dotenv').config();

const router = express.Router();
const verifySignature = require("../middlewares/verifySignature");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/answer", verifySignature, async (req, res) => {
  try {
    const question = req.body?.question;
    if (!question) return res.status(400).json({ error: 'question is required' });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: question.toString(),
    });

    res.status(200).json({ text: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
