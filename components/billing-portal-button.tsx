"use client";

import { useState } from "react";

type Props = {
  userId?: string | null;
  customerId?: string | null;
};

export function BillingPortalButton({ userId, customerId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function openPortal() {
    setError("");

    const hasUserId = !!userId;
    const hasCustomerId = !!customerId;

    if (!hasUserId && !hasCustomerId) {
      setError("Billing details are not available yet.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = hasUserId ? "/api/billing/portal" : "/api/stripe/portal";
      const payload = hasUserId ? { userId } : { customerId };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Could not open billing portal");
      }

      if (!data?.url) {
        throw new Error("Missing billing portal URL");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open billing portal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={openPortal}
        disabled={loading}
        className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Opening..." : "Manage payment details"}
      </button>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
