import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ text: "Please provide property details first." }, { status: 400 });
    }

    const prompt = `Write a polished real estate listing description from these property details:\n\n${text}\n\nMake it clear, professional, and appealing.`;

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
    console.error("listing api error", error);
    return NextResponse.json({ text: "Could not generate listing right now." }, { status: 500 });
  }
}
