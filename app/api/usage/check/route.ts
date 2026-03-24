import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  const { userId, toolKey } = await req.json();

  if (!userId || !toolKey) {
    return NextResponse.json({ error: "Missing userId or toolKey" }, { status: 400 });
  }

  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabaseAdmin
    .from("usage_logs")
    .select("count")
    .eq("auth_user_id", userId)
    .eq("tool_key", toolKey)
    .eq("usage_date", today)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ count: data?.count || 0 });
}
