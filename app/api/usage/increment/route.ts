import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  const { userId, toolKey } = await req.json();

  if (!userId || !toolKey) {
    return NextResponse.json({ error: "Missing userId or toolKey" }, { status: 400 });
  }

  const today = new Date().toISOString().slice(0, 10);

  const { data: existing } = await supabaseAdmin
    .from("usage_logs")
    .select("id,count")
    .eq("auth_user_id", userId)
    .eq("tool_key", toolKey)
    .eq("usage_date", today)
    .maybeSingle();

  if (!existing) {
    const { error } = await supabaseAdmin.from("usage_logs").insert({
      auth_user_id: userId,
      tool_key: toolKey,
      usage_date: today,
      count: 1,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, count: 1 });
  }

  const nextCount = (existing.count || 0) + 1;
  const { error } = await supabaseAdmin
    .from("usage_logs")
    .update({ count: nextCount })
    .eq("id", existing.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, count: nextCount });
}
