import { NextResponse } from "next/server";
import { sendExpiryReminderEmail, sendPlanLockedEmail } from "@/lib/billing-mail";

export const runtime = "nodejs";

export async function GET() {
  try {
    console.log("subscription reminder cron invoked");

    // Safe no-op placeholder until your real reminder query is wired up.
    // Keeps production build clean and gives you one place to add DB logic later.

    return NextResponse.json({
      ok: true,
      message: "Subscription reminder cron is ready.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Could not run subscription reminders" },
      { status: 500 }
    );
  }
}
