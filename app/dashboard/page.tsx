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
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      const user = data.session?.user

      if (!user) {
        window.location.href = "/"
        return
      }

      setUserId(user.id)
      setEmail(user.email || "")
      setReady(true)
    }

    init()
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

    setHooks(res.hooks || [])

    await fetch("/api/usage/increment", {
      method: "POST",
      body: JSON.stringify({ userId }),
    })

    setLoading(false)
  }

  const openBillingPortal = async () => {
    try {
      setBillingLoading(true)

      const res = await fetch("/api/billing/portal", {
        method: "POST",
        body: JSON.stringify({ userId }),
      })

      const data = await res.json()

      if (!data.url) {
        alert("Chưa có billing → chưa thanh toán lần nào")
        return
      }

      window.location.href = data.url
    } catch (err) {
      alert("Billing lỗi")
    } finally {
      setBillingLoading(false)
    }
  }

  if (!ready) return <div style={{ padding: 40 }}>Loading...</div>

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2>🚀 HookPilot Dashboard</h2>
        <p style={{ opacity: 0.7 }}>{email}</p>

        <div style={styles.inputRow}>
          <input
            placeholder="Topic (ví dụ: casino ads)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Audience (ví dụ: người mới)"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={generate} style={styles.primaryBtn}>
            {loading ? "Generating..." : "Generate"}
          </button>

          <button onClick={openBillingPortal} style={styles.secondaryBtn}>
            {billingLoading ? "Loading..." : "Billing"}
          </button>
        </div>

        <div style={styles.result}>
          {hooks.map((h, i) => (
            <div key={i} style={styles.hook}>
              {h}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 600,
    background: "#020617",
    padding: 24,
    borderRadius: 16,
    color: "white",
  },
  inputRow: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
    marginBottom: 16,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #334155",
    background: "#020617",
    color: "white",
  },
  primaryBtn: {
    padding: "10px 16px",
    background: "#3b82f6",
    borderRadius: 8,
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "10px 16px",
    background: "#334155",
    borderRadius: 8,
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  result: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  },
  hook: {
    padding: 10,
    borderRadius: 8,
    background: "#0f172a",
  },
}
