"use client";

import { useState } from "react";

type CheckoutButtonProps = {
  priceId: string;
  planName: string;
  userEmail?: string | null;
  disabled?: boolean;
};

export function CheckoutButton({
  priceId,
  planName,
  userEmail,
  disabled = false,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!priceId) {
      setError(`Thiếu price ID cho gói ${planName}.`);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, email: userEmail ?? undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Không tạo được phiên thanh toán.");
      }

      if (!data?.url) {
        throw new Error("Stripe không trả về đường dẫn thanh toán.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={disabled || loading}
        className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Đang chuyển sang Stripe..." : `Chọn gói ${planName}`}
      </button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
