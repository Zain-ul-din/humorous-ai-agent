import { FunctionCall } from "@google/generative-ai";
import { dadJoke } from "./tools/dad_joke";
import { genImage } from "./tools/img_gen";

export const toolRunner = async (call: FunctionCall) => {
  switch (call.name) {
    case "dad_joke":
      return dadJoke({});
    case "generate_image":
      return genImage(call.args as { prompt: string });
    default:
      throw new Error(`Unsupported function call ${call.name}`);
  }
};
