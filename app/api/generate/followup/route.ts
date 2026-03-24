import OpenAI from "openai";
export async function POST(req: Request) {
  const { input } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `Write real estate follow-up messages. Return SMS, friendly, closing. Situation: ${input}`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });
  return Response.json({ text: completion.choices[0].message.content });
}
