import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { niche, audience, tone } = await req.json();

  const hooks = [
    `Most ${audience} are approaching "${niche}" the wrong way from the start.`,
    `This is why many ${audience} never break through with "${niche}".`,
    `If you want "${niche}" to perform better, stop doing this one thing today.`,
    `You do not always need a bigger budget for "${niche}" if your message is stronger.`,
    `${tone}: most people working on "${niche}" are missing the real lever that drives conversion.`,
    `One small change in "${niche}" can save ${audience} a lot of time and wasted effort.`,
    `Why do some people do less around "${niche}" but still outperform everyone else?`,
    `If I had to restart "${niche}" today, this is the first hook I would test.`,
  ];

  return NextResponse.json({ hooks });
}
