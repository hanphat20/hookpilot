"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { supabase } from "@/lib/supabase";

type AdminUserRow = {
  email: string;
  effective_plan: string;
  effective_source: string;
  is_active: boolean;
  current_period_end: string | null;
  manual_until: string | null;
  status: string | null;
};

export default function AdminUsersPage() {
  const [userId, setUserId] = useState("");
  const [rows, setRows] = useState<AdminUserRow[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load(requesterId: string) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?requesterId=${encodeURIComponent(requesterId)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not load users");
      setRows(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load users");
    } finally {
      setLoading(false);
    }
  }

  async function updatePlan(email: string, plan: string, days = 30) {
    try {
      const res = await fetch("/api/admin/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requesterId: userId, email, plan, days }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not update user");
      await load(userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update user");
    }
  }

  useEffect(() => {
    async function init() {
      if (!supabase) {
        setError("Supabase is not configured.");
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      setUserId(user.id);
      await load(user.id);
    }

    init();
  }, []);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl">
        <SectionBadge>Admin</SectionBadge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          User Management
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
          View active users, plans, and apply manual plan changes when needed.
        </p>

        {error ? (
          <div className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-400/[0.08] p-4 text-rose-200">
            {error}
          </div>
        ) : null}

        <div className="mt-8 space-y-4">
          {loading ? (
            <div className="text-slate-300">Loading users...</div>
          ) : rows.length === 0 ? (
            <div className="text-slate-300">No users found.</div>
          ) : (
            rows.map((u) => (
              <div key={u.email} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="text-lg font-semibold text-white">{u.email}</div>
                    <div className="mt-2 text-sm text-slate-300">
                      Plan: <span className="text-white">{u.effective_plan}</span>
                      <span className="mx-2">•</span>
                      Status: <span className="text-white">{u.is_active ? "active" : "inactive"}</span>
                      <span className="mx-2">•</span>
                      Source: <span className="text-white">{u.effective_source}</span>
                    </div>
                    <div className="mt-1 text-sm text-slate-400">
                      Stripe status: {u.status || "none"}
                      {u.current_period_end ? ` • Stripe until: ${u.current_period_end}` : ""}
                      {u.manual_until ? ` • Manual until: ${u.manual_until}` : ""}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => updatePlan(u.email, "starter", 30)} className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15">
                      Activate Starter
                    </button>
                    <button onClick={() => updatePlan(u.email, "pro", 30)} className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
                      Activate Pro
                    </button>
                    <button onClick={() => updatePlan(u.email, "pro", 60)} className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15">
                      Extend +60d
                    </button>
                    <button onClick={() => updatePlan(u.email, "free", 0)} className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15">
                      Set Free
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageShell>
  );
}
