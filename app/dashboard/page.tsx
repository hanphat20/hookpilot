"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function DashboardPage() {
  const [userId, setUserId] = useState("")
  const [email, setEmail] = useState("")
  const [topic, setTopic] = useState("")
  const [audience, setAudience] = useState("")
  const [hooks, setHooks] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [billingLoading, setBillingLoading] = useState(false)
  const [plan, setPlan] = useState("free")

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user
      if (!user) {
        window.location.href = "/"
        return
      }

      setUserId(user.id)
      setEmail(user.email || "")
    })
  }, [])

  const generate = async () => {
    if (!topic || !audience) return

    setLoading(true)

    const usage = await fetch("/api/usage/check", {
      method: "POST",
      body: JSON.stringify({ userId }),
    }).then((r) => r.json())

    if (plan === "free" && usage.count >= 20) {
      alert("Hết lượt → nâng cấp")
      window.location.href = "/pricing"
      return
    }

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ topic, audience }),
    }).then((r) => r.json())

    setHooks(res.hooks)

    await fetch("/api/usage/increment", {
      method: "POST",
      body: JSON.stringify({ userId }),
    })

    setLoading(false)
  }

  const openBillingPortal = async () => {
    setBillingLoading(true)

    const res = await fetch("/api/billing/portal", {
      method: "POST",
      body: JSON.stringify({ userId }),
    })

    const data = await res.json()
    window.location.href = data.url
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>{email}</p>

      <input
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        placeholder="Audience"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
      />

      <button onClick={generate}>
        {loading ? "Loading..." : "Generate"}
      </button>

      <button onClick={openBillingPortal}>
        {billingLoading ? "Loading..." : "Billing"}
      </button>

      <div>
        {hooks.map((h, i) => (
          <p key={i}>{h}</p>
        ))}
      </div>
    </div>
  )
}
