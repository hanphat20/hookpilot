import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ text: "Please provide campaign details first." }, { status: 400 });
    }

    const prompt = `You are a real estate ad copywriter.

Write campaign output in this structure:
1. Three headlines
2. Two primary text versions
3. Two CTA ideas

Rules:
- focus on buyer benefit
- clear and practical language
- usable for a Facebook property campaign

Campaign brief:
${input}`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();
    return NextResponse.json({ text: data?.choices?.[0]?.message?.content || "No result returned." });
  } catch (error) {
    console.error("ads api error", error);
    return NextResponse.json({ text: "Could not generate ad copy right now." }, { status: 500 });
  }
}
