import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system:
      "You are a helpful assistant created by Neon.tech and Aceternity. Your job is to answer questions asked by the user in a polite and respectful manner. Always answer in markdown.",
    messages,
  });

  return result.toDataStreamResponse();
}
