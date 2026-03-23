import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  const { topic, audience } = await req.json()

  const prompt = `
Bạn là chuyên gia viết hook quảng cáo chuyển đổi cao.

Viết 10 hook cực cuốn cho:
Chủ đề: ${topic}
Tệp khách: ${audience}

Yêu cầu:
- Ngắn gọn
- Gây tò mò
- Có yếu tố giật tít
- Phù hợp ads / affiliate / casino / dropship

Trả về dạng list.
`

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  })

  const text = completion.choices[0].message.content || ""

  const hooks = text.split("\n").filter((line) => line.trim())

  return NextResponse.json({ hooks })
}
