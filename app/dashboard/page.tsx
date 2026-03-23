"use client";

import { useMemo } from "react";

const customerId = "";
const currentPlan = "free";

export default function DashboardPage() {
  const planLabel = useMemo(() => {
    if (currentPlan === "pro") return "PRO";
    if (currentPlan === "starter") return "STARTER";
    return "FREE";
  }, []);

  const openPortal = async () => {
    const res = await fetch("/api/stripe/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId }),
    });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Gói hiện tại</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">{planLabel}</h1>
        <p className="mt-3 text-gray-600">
          Đây là bản chuẩn để bạn đè nhanh. Khi nối DB xong chỉ cần thay currentPlan và customerId bằng dữ liệu thật.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/pricing"
            className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white"
          >
            Upgrade
          </a>
          <button
            type="button"
            onClick={openPortal}
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900"
          >
            Manage Billing
          </button>
        </div>
      </div>
    </main>
  );
}
