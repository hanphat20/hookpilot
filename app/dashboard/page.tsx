"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BillingPortalButton } from "@/components/billing-portal-button";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("free");
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("user_email") || "");
    setPlan(localStorage.getItem("customer_plan") || "free");
    setCustomerId(localStorage.getItem("stripe_customer_id") || "");
  }, []);

  const usageLimit = useMemo(() => {
    if (plan === "pro") return "Unlimited";
    if (plan === "starter") return "50 / day";
    return "5 / day";
  }, [plan]);

  if (!email) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl rounded-[34px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
          <SectionBadge>Login required</SectionBadge>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white">You need to login first</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Continue with your customer email before accessing the billing and tool dashboard.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Go to login
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-9 shadow-[0_35px_100px_rgba(2,10,20,0.38)]">
        <div className="grid gap-8 xl:grid-cols-[1.35fr,0.95fr]">
          <div>
            <SectionBadge>Billing & tools</SectionBadge>
            <h1 className="mt-6 text-6xl font-semibold tracking-tight text-white">Dashboard</h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-slate-300">
              Manage your plan, usage, customer billing details, and access to the real estate tool suite.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-[#06101d]/80 px-6 py-5">
                <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Customer</div>
                <div className="mt-2 text-lg font-medium text-white">{email}</div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#06101d]/80 px-6 py-5">
                <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Current plan</div>
                <div className="mt-2 text-3xl font-semibold capitalize text-white">{plan}</div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#06101d]/80 px-6 py-5">
                <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Usage limit</div>
                <div className="mt-2 text-3xl font-semibold text-white">{usageLimit}</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/tools"
                className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-medium text-white transition hover:bg-white/10"
              >
                Open tools
              </Link>
              <Link
                href="/pricing"
                className="rounded-2xl bg-cyan-400 px-7 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Upgrade plan
              </Link>
            </div>
          </div>

          <div className="rounded-[30px] border border-cyan-400/25 bg-cyan-400/[0.09] p-8">
            <div className="text-sm uppercase tracking-[0.22em] text-cyan-100">Auto-renew</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white">
              Saved card & renewal settings
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-100">
              Update card details, keep renewals active, and manage billing from the customer area.
            </p>

            <div className="mt-8">
              <BillingPortalButton customerId={customerId || undefined} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
