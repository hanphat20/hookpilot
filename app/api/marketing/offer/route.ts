import { NextResponse } from "next/server";
import { sendFirstPaymentOfferEmail } from "@/lib/billing-mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const pricingUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pricing`;

    await sendFirstPaymentOfferEmail(email, pricingUrl);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("offer email error", error);
    return NextResponse.json({ error: "Could not send offer email" }, { status: 500 });
  }
}
