"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { supabase } from "@/lib/supabase";

type RevenueStats = {
  totalUsers: number;
  activeUsers: number;
  starterUsers: number;
  proUsers: number;
  mrr: number;
  totalUsageToday: number;
};

export default function AdminRevenuePage() {
  const [userId, setUserId] = useState("");
  const [stats, setStats] = useState<RevenueStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function init() {
      if (!supabase) {
        setError("Supabase is not configured.");
        return;
      }

      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) {
        setError("Please login first.");
        return;
      }

      setUserId(user.id);

      const res = await fetch(`/api/admin/revenue?requesterId=${encodeURIComponent(user.id)}`);
      const dataJson = await res.json();
      if (!res.ok) {
        setError(dataJson?.error || "Could not load revenue stats");
        return;
      }

      setStats(dataJson.stats || null);
    }

    init();
  }, []);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl">
        <SectionBadge>Admin</SectionBadge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Revenue Dashboard
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
          Watch active users, paid plans, estimated MRR, and total daily usage.
        </p>

        {error ? (
          <div className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-400/[0.08] p-4 text-rose-200">
            {error}
          </div>
        ) : null}

        {!stats ? (
          <div className="mt-8 text-slate-300">Loading stats...</div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <div className="text-sm text-slate-400">Total users</div>
              <div className="mt-2 text-4xl font-semibold text-white">{stats.totalUsers}</div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <div className="text-sm text-slate-400">Active users</div>
              <div className="mt-2 text-4xl font-semibold text-white">{stats.activeUsers}</div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <div className="text-sm text-slate-400">Starter users</div>
              <div className="mt-2 text-4xl font-semibold text-white">{stats.starterUsers}</div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <div className="text-sm text-slate-400">Pro users</div>
              <div className="mt-2 text-4xl font-semibold text-white">{stats.proUsers}</div>
            </div>
            <div className="rounded-[24px] border border-cyan-400/25 bg-cyan-400/[0.08] p-5">
              <div className="text-sm text-cyan-100">Estimated MRR</div>
              <div className="mt-2 text-4xl font-semibold text-white">${stats.mrr}</div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <div className="text-sm text-slate-400">Usage today</div>
              <div className="mt-2 text-4xl font-semibold text-white">{stats.totalUsageToday}</div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
