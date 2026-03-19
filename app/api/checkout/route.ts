import Stripe from "stripe"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const priceId = String(body.priceId || "").trim()
    const userId = String(body.userId || "").trim()
    const email = String(body.email || "").trim()

    console.log("CHECKOUT priceId =", priceId)
    console.log("CHECKOUT userId =", userId)
    console.log("CHECKOUT email =", email)
    console.log("CHECKOUT appUrl =", process.env.NEXT_PUBLIC_APP_URL)
    console.log("CHECKOUT secret exists =", !!process.env.STRIPE_SECRET_KEY)

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email || undefined,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=1`,
      metadata: {
        auth_user_id: userId,
      },
      subscription_data: {
        metadata: {
          auth_user_id: userId,
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("CHECKOUT_ERROR FULL =", error)
    return NextResponse.json(
      { error: error?.message || "Failed to create checkout session." },
      { status: 500 }
    )
  }
}
