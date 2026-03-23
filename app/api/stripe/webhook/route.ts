import { createClient } from "@supabase/supabase-js"
import { headers } from "next/headers"
import { stripe } from "../../../../lib/stripe"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function mapPriceIdToPlan(priceId?: string | null) {
  if (!priceId) return "free"
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID) return "starter"
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID) return "pro"
  return "free"
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get("stripe-signature")

  if (!signature) {
    return new Response("Missing stripe-signature", { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const authUserId = session.metadata?.auth_user_id || null

        if (authUserId && session.subscription) {
          const subscriptionId =
            typeof session.subscription === "string"
              ? session.subscription
              : session.subscription.id

          const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId)
          const item = stripeSubscription.items.data[0]
          const priceId = item?.price?.id ?? null
          const plan = mapPriceIdToPlan(priceId)

          await supabaseAdmin.from("subscriptions").upsert(
            {
              auth_user_id: authUserId,
              stripe_customer_id:
                typeof stripeSubscription.customer === "string"
                  ? stripeSubscription.customer
                  : stripeSubscription.customer?.id,
              stripe_subscription_id: stripeSubscription.id,
              stripe_price_id: priceId,
              plan,
              status: stripeSubscription.status,
              current_period_end: item?.current_period_end
                ? new Date(item.current_period_end * 1000).toISOString()
                : null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "auth_user_id" }
          )
        }

        break
      }

      case "customer.subscription.updated":
      case "customer.subscription.created":
      case "customer.subscription.deleted": {
        const subscription = event.data.object
        const authUserId = subscription.metadata?.auth_user_id || null
        const item = subscription.items.data[0]
        const priceId = item?.price?.id ?? null
        const plan = mapPriceIdToPlan(priceId)

        if (authUserId) {
          await supabaseAdmin.from("subscriptions").upsert(
            {
              auth_user_id: authUserId,
              stripe_customer_id:
                typeof subscription.customer === "string"
                  ? subscription.customer
                  : subscription.customer?.id,
              stripe_subscription_id: subscription.id,
              stripe_price_id: priceId,
              plan,
              status: subscription.status,
              current_period_end: item?.current_period_end
                ? new Date(item.current_period_end * 1000).toISOString()
                : null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "auth_user_id" }
          )
        }

        break
      }

      default:
        break
    }

    return new Response("ok", { status: 200 })
  } catch (error: any) {
    return new Response(`Server Error: ${error?.message || "unknown error"}`, {
      status: 500,
    })
  }
}
