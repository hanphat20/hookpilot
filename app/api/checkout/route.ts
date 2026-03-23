import { NextResponse } from "next/server"
import { stripe } from "../../../lib/stripe"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { priceId, userId, email } = body as {
      priceId?: string
      userId?: string
      email?: string
    }

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!
    if (!appUrl) {
      return NextResponse.json({ error: "Missing NEXT_PUBLIC_APP_URL" }, { status: 500 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/pricing?success=1`,
      cancel_url: `${appUrl}/pricing?canceled=1`,
      metadata: {
        auth_user_id: userId,
      },
      subscription_data: {
        metadata: {
          auth_user_id: userId,
        },
      },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
