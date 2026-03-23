import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { product } = await req.json();

  const prompt = `Viết kịch bản TikTok bán hàng cho sản phẩm: ${product}.
Bao gồm:
- 3 hook viral
- script 30s
- CTA`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || "Lỗi AI";

  return NextResponse.json({ text });
}
