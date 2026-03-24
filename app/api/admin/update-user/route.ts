import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getEmailFromUserId, requireAdminByEmail } from "@/lib/admin";

export async function POST(req: Request) {
  const body = await req.json();
  const { requesterId, email, plan, days = 30 } = body;

  const requesterEmail = await getEmailFromUserId(requesterId);
  const auth = await requireAdminByEmail(requesterEmail);

  if (!auth.ok) {
    return auth.response;
  }

  if (!email || !plan) {
    return NextResponse.json({ error: "Missing email or plan" }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin is not configured" }, { status: 500 });
  }

  if (plan === "free") {
    const { error } = await supabaseAdmin
      .from("subscriptions")
      .update({
        manual_override: false,
        manual_plan: null,
        manual_until: null,
        updated_at: new Date().toISOString(),
      })
      .eq("email", email);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  const until = new Date();
  until.setDate(until.getDate() + Number(days || 30));

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update({
      manual_override: true,
      manual_plan: plan,
      manual_until: until.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("email", email);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
