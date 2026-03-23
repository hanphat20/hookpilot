"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Plan } from "@/lib/plans";
import { PLAN_LABELS, canUseProFeatures, canUseStarterFeatures } from "@/lib/plans";

export default function DashboardPage() {
  const [currentPlan] = useState<Plan>("free");

  const planLabel = useMemo(() => {
    return PLAN_LABELS[currentPlan];
  }, [currentPlan]);

  const starterUnlocked = canUseStarterFeatures(currentPlan);
  const proUnlocked = canUseProFeatures(currentPlan);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-500">Plan hiện tại: {planLabel}</p>
        </div>

        {currentPlan === "free" ? (
          <Link
            href="/pricing"
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Upgrade
          </Link>
        ) : (
          <button
            type="button"
            className="rounded-xl border px-5 py-3 text-sm font-medium"
            onClick={async () => {
              const res = await fetch("/api/stripe/portal", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ customerId: "cus_demo_replace_me" }),
              });

              const data = await res.json();
              if (data?.url) {
                window.location.href = data.url;
              }
            }}
          >
            Manage billing
          </button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <section className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">Workspace</h2>
          <p className="mt-2 text-sm text-gray-500">Tổng quan tài khoản và gói đang dùng.</p>
          <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span>Current plan</span>
              <strong>{planLabel}</strong>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">Starter features</h2>
          <p className="mt-2 text-sm text-gray-500">Export cơ bản, workflow chuẩn, số lượt dùng cao hơn.</p>
          <div className="mt-5 text-sm">
            {starterUnlocked ? (
              <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">
                Unlocked
              </span>
            ) : (
              <span className="rounded-full bg-yellow-100 px-3 py-1 font-medium text-yellow-700">
                Upgrade to Starter
              </span>
            )}
          </div>
        </section>

        <section className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">Pro features</h2>
          <p className="mt-2 text-sm text-gray-500">Automation nâng cao, export đầy đủ, quyền ưu tiên.</p>
          <div className="mt-5 text-sm">
            {proUnlocked ? (
              <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">
                Unlocked
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-3 py-1 font-medium text-red-700">
                Upgrade to Pro
              </span>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
