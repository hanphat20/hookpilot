import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin";

const PLAN_PRICES: Record<string, number> = {
  starter: 19,
  pro: 49,
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const requesterId = searchParams.get("requesterId");
  const auth = await requireAdmin(requesterId);

  if (!auth.ok) {
    return auth.response;
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin is not configured" }, { status: 500 });
  }

  const { data: subscriptions, error } = await supabaseAdmin
    .from("subscriptions")
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const now = new Date();

  let totalUsers = 0;
  let activeUsers = 0;
  let starterUsers = 0;
  let proUsers = 0;
  let mrr = 0;

  for (const row of subscriptions || []) {
    totalUsers += 1;

    const manualUntil = row.manual_until ? new Date(row.manual_until) : null;
    const currentPeriodEnd = row.current_period_end ? new Date(row.current_period_end) : null;

    const manualActive =
      !!row.manual_override &&
      !!row.manual_plan &&
      !!manualUntil &&
      manualUntil.getTime() > now.getTime();

    const stripeActive =
      row.status === "active" &&
      (!!currentPeriodEnd ? currentPeriodEnd.getTime() > now.getTime() : true);

    const effectivePlan = manualActive ? row.manual_plan : stripeActive ? row.plan || "free" : "free";
    const active = manualActive || stripeActive;

    if (active) activeUsers += 1;
    if (effectivePlan === "starter") {
      starterUsers += 1;
      if (active) mrr += PLAN_PRICES.starter;
    }
    if (effectivePlan === "pro") {
      proUsers += 1;
      if (active) mrr += PLAN_PRICES.pro;
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const { data: usageToday } = await supabaseAdmin
    .from("usage_logs")
    .select("count")
    .eq("usage_date", today);

  const totalUsageToday = (usageToday || []).reduce((sum: number, row: any) => sum + (row.count || 0), 0);

  return NextResponse.json({
    stats: {
      totalUsers,
      activeUsers,
      starterUsers,
      proUsers,
      mrr,
      totalUsageToday,
    },
  });
}
