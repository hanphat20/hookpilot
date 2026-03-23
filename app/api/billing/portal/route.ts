import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { stripe } from "../../../../lib/stripe"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId } = body as { userId?: string }

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    const { data: subscription, error } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("auth_user_id", userId)
      .maybeSingle()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({ error: "No Stripe customer found for this user" }, { status: 404 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${appUrl}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to create billing portal session" },
      { status: 500 }
    )
  }
}
