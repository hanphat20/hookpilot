import { NextResponse } from "next/server";

let usageCount = 0;

export async function POST(req: Request) {
  const { product } = await req.json();

  // SIMPLE LIMIT (demo)
  if (usageCount > 20) {
    return NextResponse.json({ error: "Limit reached" }, { status: 403 });
  }

  usageCount++;

  const prompt = `Write high-converting TikTok selling script for: ${product}.
Include:
- 5 viral hooks
- 30s script
- strong CTA`;

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
  const text = data.choices?.[0]?.message?.content || "AI error";

  return NextResponse.json({ text });
}
