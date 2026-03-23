"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  function handleContinue() {
    if (!email.trim()) return;
    localStorage.setItem("user_email", email.trim());
    if (!localStorage.getItem("customer_plan")) {
      localStorage.setItem("customer_plan", "free");
    }
    window.location.href = "/dashboard";
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl rounded-[34px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
        <SectionBadge>Customer access</SectionBadge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white">Login to your workspace</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Use your customer email to continue into the dashboard and manage your plan.
        </p>

        <div className="mt-8">
          <label className="mb-3 block text-lg font-medium text-slate-200">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your customer email"
            className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!email.trim()}
          className="mt-6 rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continue to dashboard
        </button>
      </div>
    </PageShell>
  );
}
