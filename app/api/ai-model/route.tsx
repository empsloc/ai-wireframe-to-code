import OpenAI from "openai";
import { NextRequest } from "next/server";
import Constants from "@/data/Constants";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_AI_API_KEY,
});
export async function POST(req: NextRequest) {
  const { model, description, imageUrl } = await req.json();
  const ModelObject = Constants.AiModelList.find((item) => item.name === model);
  const modelName = ModelObject?.modelName;
  console.log(modelName);
  const response = await openai.chat.completions.create({
    model: modelName ?? "google/gemini-2.0-flash-exp:free",
    stream: true,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: description,
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const text = chunk.choices?.[0]?.delta?.content || "";
        controller.enqueue(new TextEncoder().encode(text)); // Send data chunk
      }
      controller.close(); // End stream
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
