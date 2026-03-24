import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { checkUsageAccess } from "@/lib/usage-guard";

export async function POST(req: Request) {
  const { userId, toolKey } = await req.json();
  const today = new Date().toISOString().slice(0, 10);

  const { data: sub } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("auth_user_id", userId)
    .maybeSingle();

  const plan = sub?.plan || "free";

  const { data: usage } = await supabaseAdmin
    .from("usage_logs")
    .select("count")
    .eq("auth_user_id", userId)
    .eq("tool_key", toolKey)
    .eq("usage_date", today)
    .maybeSingle();

  const usedToday = usage?.count || 0;
  const result = checkUsageAccess({ plan, toolKey, usedToday });

  return NextResponse.json({
    plan,
    toolKey,
    usedToday,
    ...result,
  });
}
