import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system:
      "You are a helpful assistant created by Neon.tech and Aceternity. Your job is to answer questions asked by the user in a polite and respectful manner. Always answer in markdown.",
    messages,
    onFinish: async (completion) => {
      try {
        const lastMessage = messages[messages.length - 1];
        await sql`
          INSERT INTO chat_history (
            user_message,
            assistant_message,
            created_at
          ) VALUES (
            ${lastMessage.content},
            ${completion},
            NOW()
          )
        `;
      } catch (error) {
        console.error('Error saving to database:', error);
      }
    }
  });

  return result.toDataStreamResponse();
}
