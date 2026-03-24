"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";

export default function CheckoutSuccessPage() {
  const [state, setState] = useState("Verifying your upgrade...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    async function run() {
      if (!sessionId) {
        setState("Missing checkout session.");
        return;
      }

      const res = await fetch("/api/stripe/verify-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      if (!res.ok) {
        setState("Could not verify the checkout session.");
        return;
      }

      setState("Upgrade complete. Redirecting to your dashboard...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
    }

    run();
  }, []);

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl rounded-[34px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
        <SectionBadge>Checkout success</SectionBadge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white">Your upgrade is being confirmed</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">{state}</p>
      </div>
    </PageShell>
  );
}
