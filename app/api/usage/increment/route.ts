import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  const { userId, toolKey } = await req.json();
  const today = new Date().toISOString().slice(0, 10);

  const { data: existing } = await supabaseAdmin
    .from("usage_logs")
    .select("id,count")
    .eq("auth_user_id", userId)
    .eq("tool_key", toolKey)
    .eq("usage_date", today)
    .maybeSingle();

  if (!existing) {
    await supabaseAdmin.from("usage_logs").insert({
      auth_user_id: userId,
      tool_key: toolKey,
      usage_date: today,
      count: 1,
    });
    return NextResponse.json({ ok: true, count: 1 });
  }

  const next = existing.count + 1;

  await supabaseAdmin
    .from("usage_logs")
    .update({ count: next })
    .eq("id", existing.id);

  return NextResponse.json({ ok: true, count: next });
}
