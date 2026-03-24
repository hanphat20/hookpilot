import { supabaseAdmin } from "@/lib/supabase-admin";

export async function requireAdmin(userId: string | null | undefined) {
  if (!userId) {
    return {
      ok: false as const,
      response: new Response(
        JSON.stringify({ error: "No user" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  if (!supabaseAdmin) {
    return {
      ok: false as const,
      response: new Response(
        JSON.stringify({ error: "Supabase admin is not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);

  if (error || !data?.user) {
    return {
      ok: false as const,
      response: new Response(
        JSON.stringify({ error: error?.message || "Could not load admin user" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  const email = data.user.email || "";
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

  return { ok: true as const, email };
}
