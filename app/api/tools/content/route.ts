import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { keyword, platform, goal } = await req.json();

  const hooks = [
    `Stop creating content around "${keyword}" the old way if your real goal is ${String(goal).toLowerCase()}.`,
    `Three angles for "${keyword}" on ${platform} that make your message clearer and easier to convert.`,
    `If you are stuck on "${keyword}", this is a faster structure for content that actually moves people.`,
  ];

  const caption = [
    "You do not need more content. You need the right content.",
    `For "${keyword}", focus on a real pain point, a clear outcome, and a direct CTA that fits ${platform}.`,
    `This version is shaped for the goal: ${goal}.`,
  ].join("\n\n");

  const script = [
    `Opening: call out the biggest problem your audience faces when dealing with "${keyword}".`,
    "Middle: show two or three clear points that make the solution practical and believable.",
    "Ending: push one direct CTA so the viewer knows exactly what to do next.",
  ].join("\n\n");

  const ctas = ["Get the demo", "Start now", "See the workflow"];

  return NextResponse.json({ hooks, caption, script, ctas });
}
