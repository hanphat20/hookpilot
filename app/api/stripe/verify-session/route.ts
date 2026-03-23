import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

function getPlanFromPrice(priceId: string | null) {
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID) return "pro";
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID) return "starter";
  return "free";
}

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    const customerId = typeof session.customer === "string" ? session.customer : null;
    const email = session.customer_details?.email || session.customer_email || null;
    const subscription = session.subscription as any;
    const priceId = subscription?.items?.data?.[0]?.price?.id || null;
    const plan = getPlanFromPrice(priceId);

    return NextResponse.json({
      plan,
      customerId,
      email,
      status: subscription?.status || "active",
    });
  } catch (error) {
    console.error("verify session error", error);
    return NextResponse.json({ error: "Could not verify session" }, { status: 500 });
  }
}
