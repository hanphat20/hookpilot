"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../../lib/supabase"

export default function AuthCallbackPage() {
  const router = useRouter()
  const [message, setMessage] = useState("Processing authentication...")

  useEffect(() => {
    const handleAuth = async () => {
      const hash = window.location.hash
      const query = new URLSearchParams(hash.replace(/^#/, ""))

      const access_token = query.get("access_token")
      const refresh_token = query.get("refresh_token")

      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        })

        if (error) {
          setMessage(`Authentication failed: ${error.message}`)
          return
        }

        setMessage("Authentication successful. Redirecting...")
        setTimeout(() => router.push("/"), 1200)
        return
      }

      const { data } = await supabase.auth.getSession()

      if (data.session) {
        setMessage("Session found. Redirecting...")
        setTimeout(() => router.push("/"), 1200)
      } else {
        setMessage("No active session found after email confirmation.")
      }
    }

    handleAuth()
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">HookPilot</h1>
        <p className="mt-3 text-sm text-slate-600">{message}</p>
      </div>
    </main>
  )
}
