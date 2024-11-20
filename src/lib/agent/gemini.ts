import { GoogleGenerativeAI } from "@google/generative-ai";

const googleGenerativeAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

const gemini = googleGenerativeAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 1.0
  }
});

export default gemini;
