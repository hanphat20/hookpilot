import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PrismaClient } from "@prisma/client";
import {
  sendPaymentFailedEmail,
  sendPlanLockedEmail,
  sendWelcomeEmail,
} from "@/lib/billing-mail";
import { isLockedStatus } from "@/lib/plan-guards";

const prisma = new PrismaClient();

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
          const plan = priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ? "pro" : "starter";

          await prisma.user.upsert({
            where: { email },
            update: {
              plan,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: priceId,
              subscriptionStatus: subscription?.status || "active",
              currentPeriodEnd: subscription?.current_period_end
                ? new Date(subscription.current_period_end * 1000)
                : null,
              planLockedAt: null,
            },
            create: {
              email,
              plan,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: priceId,
              subscriptionStatus: subscription?.status || "active",
              currentPeriodEnd: subscription?.current_period_end
                ? new Date(subscription.current_period_end * 1000)
                : null,
            },
          });

          await sendWelcomeEmail(email);
        }

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = typeof subscription.customer === "string" ? subscription.customer : null;
        const priceId = subscription.items.data[0]?.price.id || null;
        const plan = priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ? "pro" : "starter";
        const locked = isLockedStatus(subscription.status);

        if (customerId) {
          const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
          if (user) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                plan: locked ? "free" : plan,
                stripeSubscriptionId: subscription.id,
                stripePriceId: priceId,
                subscriptionStatus: subscription.status,
                currentPeriodEnd: subscription.current_period_end
                  ? new Date(subscription.current_period_end * 1000)
                  : null,
                planLockedAt: locked ? new Date() : null,
              },
            });

            if (locked) {
              await sendPlanLockedEmail(user.email);
            }
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = typeof subscription.customer === "string" ? subscription.customer : null;

        if (customerId) {
          const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
          if (user) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                plan: "free",
                subscriptionStatus: "canceled",
                currentPeriodEnd: new Date(),
                planLockedAt: new Date(),
              },
            });

            await sendPlanLockedEmail(user.email);
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = typeof invoice.customer === "string" ? invoice.customer : null;

        if (customerId) {
          const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
          if (user) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                subscriptionStatus: "past_due",
              },
            });

            await sendPaymentFailedEmail(user.email);
          }
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
