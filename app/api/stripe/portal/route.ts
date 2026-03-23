import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const customerId = body?.customerId as string | undefined;

    if (!customerId) {
      return NextResponse.json({ error: "Thiếu customerId." }, { status: 400 });
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    return NextResponse.json({ url: portal.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không tạo được billing portal.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
