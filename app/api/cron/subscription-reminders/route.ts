import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendExpiryReminderEmail, sendPlanLockedEmail } from "@/lib/billing-mail";

export const runtime = "nodejs";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const inThreeDays = new Date(now);
  inThreeDays.setDate(inThreeDays.getDate() + 3);

  const users = await prisma.user.findMany({
    where: {
      plan: { not: "free" },
    },
  });

  let reminders = 0;
  let locked = 0;

  for (const user of users) {
    if (!user.currentPeriodEnd) continue;

    const msLeft = user.currentPeriodEnd.getTime() - now.getTime();
    const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));

    if (daysLeft === 3 || daysLeft === 1 || daysLeft === 0) {
      await sendExpiryReminderEmail(user.email, Math.max(daysLeft, 0));
      reminders++;
    }

    if (user.currentPeriodEnd < now && user.plan !== "free") {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          plan: "free",
          planLockedAt: new Date(),
          subscriptionStatus: "expired",
        },
      });

      await sendPlanLockedEmail(user.email);
      locked++;
    }
  }

  return NextResponse.json({
    ok: true,
    reminders,
    locked,
    checked: users.length,
  });
}
