import { NextResponse } from "next/server";
import { sendFirstPaymentOfferEmail } from "@/lib/billing-mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    await sendFirstPaymentOfferEmail(email);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Could not send offer email" },
      { status: 500 }
    );
  }
}
