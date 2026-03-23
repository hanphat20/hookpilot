import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();
    const priceId = body?.priceId as string | undefined;
    const emailFromBody = body?.email as string | undefined;
    const email = session?.user?.email ?? emailFromBody;

    if (!priceId) {
      return NextResponse.json({ error: "Thiếu priceId." }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Thiếu email người dùng." }, { status: 400 });
    }

    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?billing=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?billing=cancelled`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không tạo được checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
