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
}
