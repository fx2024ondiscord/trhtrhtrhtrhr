import { OpenRouterLanguageModel } from "@ai-sdk/openrouter"
import { streamText } from "ai"

export const runtime = "edge"

export async function POST(req) {
  const { messages } = await req.json()

  const model = new OpenRouterLanguageModel({
    model: "openai/gpt-3.5-turbo",
    apiKey: process.env.OPENROUTER_API_KEY,
  })

  const response = streamText({
    model,
    messages: [
      { role: "system", content: "You are a helpful AI assistant that speaks Tigrinya. Respond in Tigrinya." },
      ...messages,
    ],
  })

  return response.toDataStreamResponse()
}

