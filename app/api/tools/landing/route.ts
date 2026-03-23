import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { brand, offer, cta } = await req.json();

  const headline = `${brand} helps you launch faster and sell with more clarity.`;
  const subheadline = `Turn this offer into a sharper landing page message: ${offer}`;
  const bulletPoints = [
    "Clarify the core benefit instead of writing broad, weak copy.",
    "Translate the offer into simple messaging that is easier to buy.",
    "Generate a landing structure you can move into code or a builder quickly.",
  ];

  const html = `<section class="hero">
  <h1>${headline}</h1>
  <p>${subheadline}</p>
  <ul>
    <li>${bulletPoints[0]}</li>
    <li>${bulletPoints[1]}</li>
    <li>${bulletPoints[2]}</li>
  </ul>
  <a href="#cta">${cta}</a>
</section>`;

  return NextResponse.json({
    headline,
    subheadline,
    bulletPoints,
    cta,
    html,
  });
}
