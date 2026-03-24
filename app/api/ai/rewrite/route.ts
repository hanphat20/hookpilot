import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { input, mode } = await req.json();

    if (!input) {
      return NextResponse.json({ text: "Please paste the current listing first." }, { status: 400 });
    }

    const prompt = `You are a professional real estate listing editor.

Rewrite the following property listing.

Rewrite goal:
${mode || "Make it more persuasive"}

Rules:
- keep it professional
- make it easier to publish
- improve clarity and positioning
- do not add fake facts

Current listing:
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
    console.error("rewrite api error", error);
    return NextResponse.json({ text: "Could not rewrite the listing right now." }, { status: 500 });
  }
}
