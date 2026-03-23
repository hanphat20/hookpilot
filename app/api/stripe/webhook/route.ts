import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  sendPaymentFailedEmail,
  sendPlanLockedEmail,
  sendWelcomeEmail,
} from "@/lib/billing-mail";

type MemoryUser = {
  email: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripePriceId?: string | null;
  subscriptionStatus?: string | null;
  currentPeriodEnd?: string | null;
  plan?: "free" | "starter" | "pro";
};

const users = new Map<string, MemoryUser>();

function getPlanFromPrice(priceId: string | null) {
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID) return "pro";
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID) return "starter";
  return "free";
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error("webhook signature error", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = typeof session.customer === "string" ? session.customer : null;
        const subscriptionId = typeof session.subscription === "string" ? session.subscription : null;
        const email = session.customer_details?.email || session.customer_email;

        if (email) {
          const subscription = subscriptionId
            ? await stripe.subscriptions.retrieve(subscriptionId)
            : null;

          const priceId = subscription?.items.data[0]?.price.id || null;
          const plan = getPlanFromPrice(priceId);

          users.set(email, {
            email,
            plan,
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            stripePriceId: priceId,
            subscriptionStatus: subscription?.status || "active",
            currentPeriodEnd: subscription?.current_period_end
              ? new Date(subscription.current_period_end * 1000).toISOString()
              : null,
          });

          await sendWelcomeEmail(email);
        }

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = typeof subscription.customer === "string" ? subscription.customer : null;
        const priceId = subscription.items.data[0]?.price.id || null;
        const plan = getPlanFromPrice(priceId);
        const locked =
          subscription.status === "canceled" ||
          subscription.status === "unpaid" ||
          subscription.status === "incomplete_expired";

        const matchedUser = [...users.values()].find((u) => u.stripeCustomerId === customerId);
        if (matchedUser) {
          matchedUser.plan = locked ? "free" : plan;
          matchedUser.stripeSubscriptionId = subscription.id;
          matchedUser.stripePriceId = priceId;
          matchedUser.subscriptionStatus = subscription.status;
          matchedUser.currentPeriodEnd = subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null;

          users.set(matchedUser.email, matchedUser);

          if (locked) {
            await sendPlanLockedEmail(matchedUser.email);
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = typeof subscription.customer === "string" ? subscription.customer : null;
        const matchedUser = [...users.values()].find((u) => u.stripeCustomerId === customerId);

        if (matchedUser) {
          matchedUser.plan = "free";
          matchedUser.subscriptionStatus = "canceled";
          matchedUser.currentPeriodEnd = new Date().toISOString();
          users.set(matchedUser.email, matchedUser);
          await sendPlanLockedEmail(matchedUser.email);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = typeof invoice.customer === "string" ? invoice.customer : null;
        const matchedUser = [...users.values()].find((u) => u.stripeCustomerId === customerId);

        if (matchedUser) {
          matchedUser.subscriptionStatus = "past_due";
          users.set(matchedUser.email, matchedUser);
          await sendPaymentFailedEmail(matchedUser.email);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("webhook handler error", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
