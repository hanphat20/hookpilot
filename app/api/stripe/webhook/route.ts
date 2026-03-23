import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Thiếu stripe-signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook signature không hợp lệ.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      console.log("checkout.session.completed", event.data.object.id);
      break;
    case "customer.subscription.updated":
      console.log("customer.subscription.updated", event.data.object.id);
      break;
    case "customer.subscription.deleted":
      console.log("customer.subscription.deleted", event.data.object.id);
      break;
    default:
      console.log("Unhandled event", event.type);
  }

  return NextResponse.json({ received: true });
}
