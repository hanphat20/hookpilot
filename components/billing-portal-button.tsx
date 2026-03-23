"use client";

import { useState } from "react";

type Props = {
  customerId?: string | null;
};

export function BillingPortalButton({ customerId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function openPortal() {
    setError("");

    if (!customerId) {
      setError("Missing Stripe customer ID.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Could not open billing portal");
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("Missing portal URL");
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
        className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Opening..." : "Manage card & auto-renew"}
      </button>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
