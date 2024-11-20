import { GoogleGenerativeAI } from "@google/generative-ai";

const googleGenerativeAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

const gemini = googleGenerativeAI.getGenerativeModel({
  model: "models/gemini-1.5-pro"
});

export default gemini;
