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
      <div className="mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_90px_rgba(2,10,20,0.35)] sm:rounded-[34px] sm:p-8">
        <SectionBadge>Customer access</SectionBadge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-5xl">
          Login to your workspace
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-300 sm:mt-5 sm:text-lg">
          Use your customer email to continue into the dashboard and manage your plan.
        </p>

        <div className="mt-7 sm:mt-8">
          <label className="mb-3 block text-base font-medium text-slate-200 sm:text-lg">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your customer email"
            className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-4 py-4 text-base text-white outline-none placeholder:text-slate-500 sm:px-5 sm:text-lg"
          />
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!email.trim()}
          className="mt-6 w-full rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-7 sm:w-auto"
        >
          Continue to dashboard
        </button>
      </div>
    </PageShell>
  );
}
