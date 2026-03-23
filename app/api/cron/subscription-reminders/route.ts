import { NextResponse } from "next/server";
import { sendExpiryReminderEmail } from "@/lib/billing-mail";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (process.env.DEBUG_REMINDER_EMAIL_TO) {
    await sendExpiryReminderEmail(process.env.DEBUG_REMINDER_EMAIL_TO, 3);
  }

  return NextResponse.json({
    ok: true,
    mode: "build-stable",
    reminders: process.env.DEBUG_REMINDER_EMAIL_TO ? 1 : 0,
    locked: 0,
    checked: 0,
  });
}
