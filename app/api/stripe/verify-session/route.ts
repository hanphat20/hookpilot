import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getPlanFromPrice } from "@/lib/plan";

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
    const authUserId = session.metadata?.auth_user_id || null;
    const subscription = session.subscription as any;
    const priceId = subscription?.items?.data?.[0]?.price?.id || null;
    const plan = getPlanFromPrice(priceId);
    const currentPeriodEnd = subscription?.current_period_end
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : null;

    if (authUserId) {
      await supabaseAdmin.from("subscriptions").upsert(
        {
          auth_user_id: authUserId,
          email,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscription?.id || null,
          stripe_price_id: priceId,
          plan,
          status: subscription?.status || "active",
          current_period_end: currentPeriodEnd,
        },
        { onConflict: "auth_user_id" }
      );
    }

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
