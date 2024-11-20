import { SchemaType, Tool } from "@google/generative-ai";

export const tools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: "dad_joke",
        description: "Call this tool if someone ask you about dad joke"
      },
      {
        name: "generate_image",
        description: "Call this tool to generate image using a prompt",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            prompt: {
              type: SchemaType.STRING,
              description: "short & descriptive prompt to generate image"
            }
          },
          required: ["prompt"]
        }
      }
    ]
  }
];
