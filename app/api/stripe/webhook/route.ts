import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      console.log("PAY SUCCESS:", session.customer_email);

      // 👉 TODO: update DB user plan = paid

      break;

    case "customer.subscription.deleted":
      console.log("SUB CANCEL");

      // 👉 TODO: downgrade user

      break;
  }

  return NextResponse.json({ received: true });
}
