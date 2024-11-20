"use server";
import { Content } from "@google/generative-ai";
import gemini from "./gemini";

const runAgent = async (currentState: Content[], formData: FormData) => {
  const message = formData.get("message") as string;

  const chat = gemini.startChat({
    history: [...currentState]
  });
  const res = (await chat.sendMessage(message)).response.text();

  const newMessages: Content[] = [
    { role: "user", parts: [{ text: message }] },
    { role: "model", parts: [{ text: res }] }
  ];

  return [...currentState, ...newMessages];
};

export default runAgent;
