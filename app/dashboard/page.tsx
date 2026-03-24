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
        <div className="mx-auto max-w-3xl rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-center shadow-[0_30px_90px_rgba(2,10,20,0.35)] sm:rounded-[34px] sm:p-8">
          <SectionBadge>Login required</SectionBadge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-5xl">
            You need to login first
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-300 sm:mt-5 sm:text-lg">
            Continue with your customer email before accessing the billing and tool dashboard.
          </p>
          <Link
            href="/login"
            className="mt-7 inline-flex rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 sm:mt-8"
          >
            Go to login
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_35px_100px_rgba(2,10,20,0.38)] sm:rounded-[36px] sm:p-9">
        <div className="grid gap-6 xl:grid-cols-[1.35fr,0.95fr] xl:gap-8">
          <div>
            <SectionBadge>Billing & tools</SectionBadge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl">
              Dashboard
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:mt-5 sm:text-lg md:text-xl md:leading-9">
              Manage your plan, usage, customer billing details, and access to the real estate tool suite.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3 sm:mt-10">
              <div className="rounded-[22px] border border-white/10 bg-[#06101d]/80 px-5 py-5 sm:rounded-[24px] sm:px-6">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400 sm:text-sm">Customer</div>
                <div className="mt-2 break-all text-base font-medium text-white sm:text-lg">{email}</div>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-[#06101d]/80 px-5 py-5 sm:rounded-[24px] sm:px-6">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400 sm:text-sm">Current plan</div>
                <div className="mt-2 text-2xl font-semibold capitalize text-white sm:text-3xl">{plan}</div>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-[#06101d]/80 px-5 py-5 sm:rounded-[24px] sm:px-6">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400 sm:text-sm">Usage limit</div>
                <div className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{usageLimit}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10"
              >
                Open tools
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Upgrade plan
              </Link>
            </div>
          </div>

          <div className="rounded-[26px] border border-cyan-400/25 bg-cyan-400/[0.09] p-6 sm:rounded-[30px] sm:p-8">
            <div className="text-xs uppercase tracking-[0.22em] text-cyan-100 sm:text-sm">Auto-renew</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:mt-5 sm:text-4xl">
              Saved card & renewal settings
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-100 sm:text-lg">
              Update card details, keep renewals active, and manage billing from the customer area.
            </p>

            <div className="mt-6 sm:mt-8">
              <BillingPortalButton customerId={customerId || undefined} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
