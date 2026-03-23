import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  const { topic, audience } = await req.json()

  const prompt = `
Viết 10 hook cực cuốn cho:
${topic} - ${audience}

Ngắn, gây tò mò, kiểu viral ads
`

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  })

  const text = res.choices[0].message.content || ""
  const hooks = text.split("\n").filter((x) => x.trim())

  return NextResponse.json({ hooks })
}
