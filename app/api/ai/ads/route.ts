import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ text: "Please provide property ad details first." }, { status: 400 });
    }

    const prompt = `Write a Facebook real estate ad from these property details:\n\n${input}\n\nInclude 3 headlines, 2 primary text options, and 2 CTA angles.`;

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
