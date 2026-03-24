import { supabaseAdmin } from "@/lib/supabase-admin";

export async function requireAdminByEmail(email: string | null | undefined) {
  const adminEmail = process.env.ADMIN_EMAIL || "";
  if (!email || !adminEmail || email.toLowerCase() !== adminEmail.toLowerCase()) {
    return {
      ok: false as const,
      response: new Response(
        JSON.stringify({ error: "Forbidden" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  return { ok: true as const };
}

export async function getEmailFromUserId(userId: string | null | undefined) {
  if (!userId || !supabaseAdmin) return null;

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("email")
    .eq("id", userId)
    .maybeSingle();

  if (profile?.email) return profile.email;

  const { data: subscription } = await supabaseAdmin
    .from("subscriptions")
    .select("email")
    .eq("auth_user_id", userId)
    .maybeSingle();

  return subscription?.email || null;
}
