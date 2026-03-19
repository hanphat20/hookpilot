"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { translations, type Lang } from "./messages/translations"

type AuthMode = "login" | "signup"
type Plan = "free" | "starter" | "pro"

export default function Home() {
  const [mode, setMode] = useState<AuthMode>("login")
  const [lang, setLang] = useState<Lang>("en")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [plan, setPlan] = useState<Plan>("free")

  const t = translations[lang]

  useEffect(() => {
    const savedLang = localStorage.getItem("hookpilot_lang") as Lang | null
    if (savedLang === "en" || savedLang === "vi") {
      setLang(savedLang)
    }

    const loadSessionAndPlan = async () => {
      const { data } = await supabase.auth.getSession()
      const sessionEmail = data.session?.user?.email ?? null
      const sessionUserId = data.session?.user?.id ?? null

      setUserEmail(sessionEmail)

      if (sessionUserId) {
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("plan,status")
          .eq("auth_user_id", sessionUserId)
          .in("status", ["active", "trialing"])
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle()

        if (subscription?.plan === "starter" || subscription?.plan === "pro") {
          setPlan(subscription.plan)
        } else {
          setPlan("free")
        }
      } else {
        setPlan("free")
      }
    }

    loadSessionAndPlan()

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUserEmail(session?.user?.email ?? null)

      const sessionUserId = session?.user?.id ?? null

      if (sessionUserId) {
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("plan,status")
          .eq("auth_user_id", sessionUserId)
          .in("status", ["active", "trialing"])
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle()

        if (subscription?.plan === "starter" || subscription?.plan === "pro") {
          setPlan(subscription.plan)
        } else {
          setPlan("free")
        }
      } else {
        setPlan("free")
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const changeLang = (nextLang: Lang) => {
    setLang(nextLang)
    localStorage.setItem("hookpilot_lang", nextLang)
  }

  const signUp = async () => {
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage(t.signupSuccess)
  }

  const login = async () => {
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage(t.loginSuccess)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUserEmail(null)
    setPlan("free")
    setMessage("")
  }

  const planLabel =
    plan === "starter" ? "Starter" : plan === "pro" ? "Pro" : t.free

  if (userEmail) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex justify-end">
            <div className="flex gap-2 rounded-xl border border-slate-200 bg-white p-1">
              <button
                onClick={() => changeLang("en")}
                className={`rounded-lg px-3 py-2 text-sm ${lang === "en" ? "bg-slate-900 text-white" : "text-slate-600"}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLang("vi")}
                className={`rounded-lg px-3 py-2 text-sm ${lang === "vi" ? "bg-slate-900 text-white" : "text-slate-600"}`}
              >
                VI
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-600">{t.badge}</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                  {t.welcomeBack}
                </h1>
                <p className="mt-2 text-slate-600">{userEmail}</p>
              </div>

              <button
                onClick={logout}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                {t.logout}
              </button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">{t.tool}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {t.viralHookGenerator}
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">{t.plan}</p>
                <h3
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    plan === "pro"
                      ? "bg-purple-100 text-purple-700"
                      : plan === "starter"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {planLabel}
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">{t.status}</p>
                <h3 className="mt-2 text-lg font-semibold text-emerald-600">
                  {t.active}
                </h3>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/dashboard"
                className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {t.openGenerator}
              </a>

              <a
                href="/pricing"
                className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                {t.pricing}
              </a>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex justify-end">
          <div className="flex gap-2 rounded-xl border border-slate-200 bg-white p-1">
            <button
              onClick={() => changeLang("en")}
              className={`rounded-lg px-3 py-2 text-sm ${lang === "en" ? "bg-slate-900 text-white" : "text-slate-600"}`}
            >
              EN
            </button>
            <button
              onClick={() => changeLang("vi")}
              className={`rounded-lg px-3 py-2 text-sm ${lang === "vi" ? "bg-slate-900 text-white" : "text-slate-600"}`}
            >
              VI
            </button>
          </div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <section>
            <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              {t.badge}
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-tight text-slate-900">
              {t.heroTitle}
            </h1>

            <p className="mt-5 max-w-xl text-lg text-slate-600">
              {t.heroDesc}
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setMode("signup")}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                {t.createAccount}
              </button>

              <button
                onClick={() => setMode("login")}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {t.login}
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex gap-2 rounded-2xl bg-slate-100 p-1">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium ${
                  mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                }`}
              >
                {t.login}
              </button>

              <button
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium ${
                  mode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                }`}
              >
                {t.signup}
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t.email}
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t.password}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-500"
                />
              </div>

              <button
                onClick={mode === "signup" ? signUp : login}
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? t.processing : mode === "signup" ? t.signup : t.login}
              </button>

              {message ? (
                <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
                  {message}
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
