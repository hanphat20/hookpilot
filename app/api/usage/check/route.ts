import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { checkUsageAccess } from "@/lib/usage-guard";

export async function POST(req: Request) {
  const { userId, toolKey } = await req.json();

  if (!userId || !toolKey) {
    return NextResponse.json({ error: "Missing userId or toolKey" }, { status: 400 });
  }

  const today = new Date().toISOString().slice(0, 10);

  const { data: sub } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("auth_user_id", userId)
    .maybeSingle();

  const now = new Date();
  const manualUntil = sub?.manual_until ? new Date(sub.manual_until) : null;
  const currentPeriodEnd = sub?.current_period_end ? new Date(sub.current_period_end) : null;

  const manualActive =
    !!sub?.manual_override &&
    !!sub?.manual_plan &&
    !!manualUntil &&
    manualUntil.getTime() > now.getTime();

  const stripeActive =
    sub?.status === "active" &&
    (!!currentPeriodEnd ? currentPeriodEnd.getTime() > now.getTime() : true);

  const plan = manualActive ? sub?.manual_plan : stripeActive ? sub?.plan || "free" : "free";

  const { data: usage, error } = await supabaseAdmin
    .from("usage_logs")
    .select("count")
    .eq("auth_user_id", userId)
    .eq("tool_key", toolKey)
    .eq("usage_date", today)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const usedToday = usage?.count || 0;
  const result = checkUsageAccess({ plan, toolKey, usedToday });

  return NextResponse.json({
    plan,
    toolKey,
    ...result,
  });
}
