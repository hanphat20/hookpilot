"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "../../lib/supabase"

function PricingContent() {
  const searchParams = useSearchParams()
  const [currentPlan, setCurrentPlan] = useState("free")

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser()
      const uid = data.user?.id
      if (!uid) return

      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("plan,status")
        .eq("auth_user_id", uid)
        .in("status", ["active", "trialing"])
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (subscription?.plan) setCurrentPlan(subscription.plan)
    }

    load()
  }, [])

  const success = searchParams.get("success")
  const canceled = searchParams.get("canceled")

  const plans = [
    { key: "free", name: "Free", price: "$0", desc: "20 generations per day" },
    { key: "starter", name: "Starter", price: "$9", desc: "Unlimited generations for solo creators" },
    { key: "pro", name: "Pro", price: "$29", desc: "Advanced usage for teams and agencies" },
  ]

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-slate-200 bg-white/90 p-4 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">HookPilot pricing</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Choose the plan that fits your workflow
              </h1>
            </div>

            <a
              href="/"
              className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to home
            </a>
          </div>

          {success ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Payment successful. Your subscription is being activated.
            </div>
          ) : null}

          {canceled ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              Checkout canceled. You can try again anytime.
            </div>
          ) : null}

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.key}
                className={`rounded-3xl border p-6 ${
                  plan.key === "starter" ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold text-slate-900">{plan.name}</h2>
                <p className="mt-3 text-4xl font-bold text-slate-900">{plan.price}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{plan.desc}</p>

                <div className="mt-6">
                  {currentPlan === plan.key ? (
                    <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                      Current plan
                    </div>
                  ) : (
                    <button
                      className={`w-full rounded-2xl px-5 py-3 text-sm font-semibold ${
                        plan.key === "starter"
                          ? "bg-blue-600 text-white hover:bg-blue-500"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {plan.key === "free" ? "Get started" : `Choose ${plan.name}`}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default function PricingPage() {
  return (
    <Suspense fallback={<main className="min-h-screen px-4 py-8 text-slate-700">Loading pricing...</main>}>
      <PricingContent />
    </Suspense>
  )
}
