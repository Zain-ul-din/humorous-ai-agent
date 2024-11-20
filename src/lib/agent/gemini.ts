import { GoogleGenerativeAI } from "@google/generative-ai";

const googleGenerativeAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

const gemini = googleGenerativeAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

export default gemini;
