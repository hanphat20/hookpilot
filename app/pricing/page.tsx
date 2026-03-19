"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "../../lib/supabase"

type Plan = "free" | "starter" | "pro"

export default function PricingPage() {
  const searchParams = useSearchParams()

  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [userId, setUserId] = useState("")
  const [email, setEmail] = useState("")
  const [currentPlan, setCurrentPlan] = useState<Plan>("free")

  const success = searchParams.get("success")
  const canceled = searchParams.get("canceled")

  useEffect(() => {
    const loadUserAndPlan = async () => {
      const { data } = await supabase.auth.getUser()
      const uid = data.user?.id || ""
      const userEmail = data.user?.email || ""

      setUserId(uid)
      setEmail(userEmail)

      if (!uid) {
        setCurrentPlan("free")
        return
      }

      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("plan,status")
        .eq("auth_user_id", uid)
        .in("status", ["active", "trialing"])
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (subscription?.plan === "starter" || subscription?.plan === "pro") {
        setCurrentPlan(subscription.plan)
      } else {
        setCurrentPlan("free")
      }
    }

    loadUserAndPlan()
  }, [success])

  const startCheckout = async (priceId: string, planKey: string) => {
    try {
      setLoadingPlan(planKey)

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          userId,
          email,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed")
      }

      window.location.href = data.url
    } catch (error: any) {
      console.error(error)
      alert(error?.message || "Failed to start checkout.")
    } finally {
      setLoadingPlan(null)
    }
  }

  const planBadge = useMemo(() => {
    if (currentPlan === "starter") return "Starter"
    if (currentPlan === "pro") return "Pro"
    return "Free"
  }, [currentPlan])

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <a
            href="/"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Back to home
          </a>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
            Current plan: <span className="font-semibold text-slate-900">{planBadge}</span>
          </div>
        </div>

        {success ? (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            Payment successful. Your subscription is being activated.
          </div>
        ) : null}

        {canceled ? (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
            Checkout was canceled. You can try again anytime.
          </div>
        ) : null}

        <div className="text-center">
          <p className="text-sm font-medium text-blue-600">HookPilot</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">
            Simple pricing
          </h1>
          <p className="mt-3 text-slate-600">
            Start free and upgrade when you need more generations.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Free</h2>
            <p className="mt-4 text-4xl font-bold text-slate-900">$0</p>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>20 generations per day</li>
              <li>Basic frameworks</li>
              <li>History</li>
            </ul>
            <a
              href="/"
              className="mt-8 inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Start free
            </a>
          </div>

          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 shadow-sm">
            <div className="inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              Most popular
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">Starter</h2>
            <p className="mt-4 text-4xl font-bold text-slate-900">$9</p>
            <p className="text-slate-500">/month</p>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>Unlimited generations</li>
              <li>All frameworks</li>
              <li>Faster workflow</li>
            </ul>

            {currentPlan === "starter" ? (
              <div className="mt-8 inline-flex rounded-xl border border-emerald-300 bg-emerald-100 px-5 py-3 text-sm font-semibold text-emerald-700">
                Current plan
              </div>
            ) : (
              <button
                onClick={() =>
                  startCheckout(
                    process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "",
                    "starter"
                  )
                }
                disabled={!userId || loadingPlan === "starter"}
                className="mt-8 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loadingPlan === "starter" ? "Redirecting..." : "Upgrade to Starter"}
              </button>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Pro</h2>
            <p className="mt-4 text-4xl font-bold text-slate-900">$29</p>
            <p className="text-slate-500">/month</p>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>Unlimited generations</li>
              <li>Advanced AI tools</li>
              <li>Best for teams and agencies</li>
            </ul>

            {currentPlan === "pro" ? (
              <div className="mt-8 inline-flex rounded-xl border border-emerald-300 bg-emerald-100 px-5 py-3 text-sm font-semibold text-emerald-700">
                Current plan
              </div>
            ) : (
              <button
                onClick={() =>
                  startCheckout(
                    process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "",
                    "pro"
                  )
                }
                disabled={!userId || loadingPlan === "pro"}
                className="mt-8 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
              >
                {loadingPlan === "pro" ? "Redirecting..." : "Upgrade to Pro"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
