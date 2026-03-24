"use client";

import { useState } from "react";

type Props = {
  priceId: string;
  email?: string;
  userId?: string | null;
  label?: string;
};

export function CheckoutButton({ priceId, email, userId, label = "Choose plan" }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setError("");

    if (!priceId) {
      setError("Missing Stripe price ID.");
      return;
    }

    if (!email) {
      setError("Please login with your email first.");
      return;
    }

    setLoading(true);

    try {
      const useUnifiedCheckout = !!userId;
      const endpoint = useUnifiedCheckout ? "/api/checkout" : "/api/stripe/checkout";
      const payload = useUnifiedCheckout ? { priceId, email, userId } : { priceId, email };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Checkout failed");
      }

      if (!data?.url) {
        throw new Error("Missing checkout URL");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="w-full rounded-2xl bg-cyan-400 px-5 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting..." : label}
      </button>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
