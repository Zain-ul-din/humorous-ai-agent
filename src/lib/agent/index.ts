"use server";
import { Content } from "@google/generative-ai";
import gemini from "./gemini";
import { tools } from "./tools";
import { toolRunner } from "./tool-runner";
import { systemInstruction } from "./system-instruction";

const runAgent = async (currentState: Content[], formData: FormData) => {
  const message = formData.get("message") as string;
  const history = [...currentState];

  const chat = gemini.startChat({
    history: [...history],
    systemInstruction: {
      role: "system",
      parts: [{ text: systemInstruction }]
    },
    tools: tools
  });

  const res = await chat.sendMessage(message);
  const toolCall = res.response.functionCalls();
  history.push({ role: "user", parts: [{ text: message }] });

  if (toolCall) {
    // since we'll going to run in serverless that's why i'm not making multiple tool calls
    // for more details check system instructions
    const toolCallResponse = await toolRunner(toolCall[0]);
    const resText = (
      await chat.sendMessage([
        {
          functionResponse: {
            name: toolCall[0].name,
            response: {
              res: toolCallResponse
            }
          }
        }
      ])
    ).response.text();
    history.push({ role: "model", parts: [{ text: resText }] });
  } else {
    const resText = res.response.text();
    history.push({ role: "model", parts: [{ text: resText }] });
  }

  return [...history];
};

export default runAgent;
