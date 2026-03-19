import Stripe from "stripe"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

function getPlanFromPriceId(priceId: string | null) {
  if (!priceId) return "free"

  if (priceId === process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID) {
    return "starter"
  }

  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID) {
    return "pro"
  }

  return "free"
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("WEBHOOK_SIGNATURE_ERROR", error)
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 })
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      const authUserId = String(session.metadata?.auth_user_id || "").trim()
      const stripeCustomerId =
        typeof session.customer === "string" ? session.customer : null
      const stripeSubscriptionId =
        typeof session.subscription === "string" ? session.subscription : null

      if (authUserId && stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)

        const priceId = subscription.items.data[0]?.price?.id || null
        const currentPeriodEndUnix = subscription.items.data[0]?.current_period_end
        const currentPeriodEnd = currentPeriodEndUnix
          ? new Date(currentPeriodEndUnix * 1000).toISOString()
          : null

        const plan = getPlanFromPriceId(priceId)

        const { error } = await supabase.from("subscriptions").upsert(
          {
            auth_user_id: authUserId,
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,
            stripe_price_id: priceId,
            plan,
            status: subscription.status,
            current_period_end: currentPeriodEnd,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "stripe_subscription_id",
          }
        )

        if (error) {
          console.error("SUPABASE_UPSERT_ERROR", error)
        }
      }
    }

    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription

      const stripeSubscriptionId = subscription.id
      const priceId = subscription.items.data[0]?.price?.id || null
      const currentPeriodEndUnix = subscription.items.data[0]?.current_period_end
      const currentPeriodEnd = currentPeriodEndUnix
        ? new Date(currentPeriodEndUnix * 1000).toISOString()
        : null

      const plan = getPlanFromPriceId(priceId)

      const { error } = await supabase
        .from("subscriptions")
        .update({
          stripe_price_id: priceId,
          plan,
          status: subscription.status,
          current_period_end: currentPeriodEnd,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", stripeSubscriptionId)

      if (error) {
        console.error("SUPABASE_UPDATE_ERROR", error)
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription

      const { error } = await supabase
        .from("subscriptions")
        .update({
          plan: "free",
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", subscription.id)

      if (error) {
        console.error("SUPABASE_CANCEL_ERROR", error)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("WEBHOOK_HANDLER_ERROR", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
