import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getEmailFromUserId, requireAdminByEmail } from "@/lib/admin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const requesterId = searchParams.get("requesterId");
  const requesterEmail = await getEmailFromUserId(requesterId);
  const auth = await requireAdminByEmail(requesterEmail);

  if (!auth.ok) {
    return auth.response;
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin is not configured" }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data || []).map((row: any) => {
    const now = new Date();
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

    return {
      ...row,
      effective_plan: manualActive ? row.manual_plan : stripeActive ? row.plan || "free" : "free",
      effective_source: manualActive ? "manual" : "stripe",
      is_active: manualActive || stripeActive,
    };
  });

  return NextResponse.json({ users: rows });
}
