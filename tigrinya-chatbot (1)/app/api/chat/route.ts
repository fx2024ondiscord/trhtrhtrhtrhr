import { OpenRouterLanguageModel } from "@ai-sdk/openrouter"
import { streamText } from "ai"

export const runtime = "edge"

export async function POST(req: Request) {
  const { messages, language } = await req.json()

  const systemMessage =
    language === "ti"
      ? "ንስኻ ብቛንቋ ትግርኛ ዝዛረብ ሓጋዚ AI ኢኻ። ብትግርኛ መልሲ ሃብ።"
      : "You are a helpful AI assistant that speaks Tigrinya. Respond in Tigrinya."

  const model = new OpenRouterLanguageModel({
    model: "openai/gpt-3.5-turbo",
    apiKey: process.env.OPENROUTER_API_KEY!,
  })

  const response = streamText({
    model,
    messages: [{ role: "system", content: systemMessage }, ...messages],
  })

  return response.toDataStreamResponse()
}

