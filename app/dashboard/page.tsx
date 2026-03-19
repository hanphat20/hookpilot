"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "../../lib/supabase"

type Lang = "en" | "vi"
type Plan = "free" | "starter" | "pro"

type GenerationRow = {
  id: string
  topic: string
  platform: string
  audience: string
  framework: string | null
  lang: string | null
  hooks: string[]
  created_at: string
}

const copy = {
  en: {
    title: "Hook Generator",
    subtitle: "Create viral hooks for your content in seconds.",
    topic: "Topic",
    platform: "Platform",
    audience: "Audience",
    framework: "Framework",
    generate: "Generate hooks",
    generating: "Generating...",
    regenerate: "Regenerate",
    result: "Generated hooks",
    empty: "No hooks yet. Fill the form and generate.",
    placeholderTopic: "AI marketing",
    placeholderPlatform: "TikTok",
    placeholderAudience: "small business owners",
    back: "Back to home",
    error: "Something went wrong.",
    copyOne: "Copy",
    copyAll: "Copy all",
    copied: "Copied",
    history: "History",
    noHistory: "No history yet.",
    saveError: "Failed to save history.",
    loginRequired: "Please log in again.",
    curiosity: "Curiosity",
    pain: "Pain",
    contrarian: "Contrarian",
    story: "Story",
    numbers: "Numbers",
    defaultFramework: "Balanced",
    usageToday: "Usage today",
    currentPlan: "Current plan",
  },
  vi: {
    title: "Trình tạo Hook",
    subtitle: "Tạo hook viral cho nội dung của bạn trong vài giây.",
    topic: "Chủ đề",
    platform: "Nền tảng",
    audience: "Đối tượng",
    framework: "Framework",
    generate: "Tạo hooks",
    generating: "Đang tạo...",
    regenerate: "Tạo lại",
    result: "Kết quả hook",
    empty: "Chưa có hook nào. Hãy nhập form và bấm tạo.",
    placeholderTopic: "Marketing AI",
    placeholderPlatform: "TikTok",
    placeholderAudience: "chủ shop online",
    back: "Về trang chủ",
    error: "Có lỗi xảy ra.",
    copyOne: "Sao chép",
    copyAll: "Sao chép tất cả",
    copied: "Đã chép",
    history: "Lịch sử",
    noHistory: "Chưa có lịch sử.",
    saveError: "Lưu lịch sử thất bại.",
    loginRequired: "Vui lòng đăng nhập lại.",
    curiosity: "Tò mò",
    pain: "Nỗi đau",
    contrarian: "Ngược chiều",
    story: "Câu chuyện",
    numbers: "Con số",
    defaultFramework: "Cân bằng",
    usageToday: "Lượt dùng hôm nay",
    currentPlan: "Gói hiện tại",
  },
} as const

export default function DashboardPage() {
  const [lang, setLang] = useState<Lang>("en")
  const [plan, setPlan] = useState<Plan>("free")
  const [topic, setTopic] = useState("")
  const [platform, setPlatform] = useState("TikTok")
  const [audience, setAudience] = useState("")
  const [framework, setFramework] = useState("default")
  const [hooks, setHooks] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [history, setHistory] = useState<GenerationRow[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [todayUsage, setTodayUsage] = useState(0)

  const t = useMemo(() => copy[lang], [lang])

  useEffect(() => {
    const savedLang = localStorage.getItem("hookpilot_lang") as Lang | null
    if (savedLang === "en" || savedLang === "vi") {
      setLang(savedLang)
    }

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      const uid = data.user?.id ?? null
      setUserId(uid)

      if (!uid) return

      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("plan,status")
        .eq("auth_user_id", uid)
        .in("status", ["active", "trialing"])
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (subscription?.plan === "starter" || subscription?.plan === "pro") {
        setPlan(subscription.plan)
      } else {
        setPlan("free")
      }

      const { data: rows } = await supabase
        .from("generations")
        .select("*")
        .eq("auth_user_id", uid)
        .order("created_at", { ascending: false })
        .limit(10)

      setHistory((rows as GenerationRow[]) || [])

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const { count } = await supabase
        .from("generations")
        .select("*", { count: "exact", head: true })
        .eq("auth_user_id", uid)
        .gte("created_at", today.toISOString())

      setTodayUsage(count || 0)
    }

    loadUser()
  }, [])

  const frameworkOptions = [
    { value: "default", label: t.defaultFramework },
    { value: "curiosity", label: t.curiosity },
    { value: "pain", label: t.pain },
    { value: "contrarian", label: t.contrarian },
    { value: "story", label: t.story },
    { value: "numbers", label: t.numbers },
  ]

  const generateHooks = async () => {
    setLoading(true)
    setError("")
    setHooks([])

    try {
      const res = await fetch("/api/hooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          platform,
          audience,
          lang,
          framework,
          userId,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || t.error)
      }

      const nextHooks = Array.isArray(data.hooks) ? data.hooks : []
      setHooks(nextHooks)

      if (!userId) {
        setError(t.loginRequired)
        return
      }

      const { data: inserted, error: saveError } = await supabase
        .from("generations")
        .insert({
          auth_user_id: userId,
          topic,
          platform,
          audience,
          framework,
          lang,
          hooks: nextHooks,
        })
        .select()
        .single()

      if (saveError) {
        console.error(saveError)
        setError(t.saveError)
      } else if (inserted) {
        setHistory((prev) => [inserted as GenerationRow, ...prev].slice(0, 10))
        setTodayUsage((prev) => prev + 1)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : t.error
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const copyHook = async (hook: string, index: number) => {
    await navigator.clipboard.writeText(hook)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1200)
  }

  const copyAll = async () => {
    await navigator.clipboard.writeText(hooks.join("\n"))
  }

  const planLabel =
    plan === "starter" ? "Starter" : plan === "pro" ? "Pro" : "Free"

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <a
            href="/"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            {t.back}
          </a>

          <div className="flex gap-2 rounded-xl border border-slate-200 bg-white p-1">
            <button
              onClick={() => {
                setLang("en")
                localStorage.setItem("hookpilot_lang", "en")
              }}
              className={`rounded-lg px-3 py-2 text-sm ${lang === "en" ? "bg-slate-900 text-white" : "text-slate-600"}`}
            >
              EN
            </button>

            <button
              onClick={() => {
                setLang("vi")
                localStorage.setItem("hookpilot_lang", "vi")
              }}
              className={`rounded-lg px-3 py-2 text-sm ${lang === "vi" ? "bg-slate-900 text-white" : "text-slate-600"}`}
            >
              VI
            </button>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-3">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm xl:col-span-1">
            <p className="text-sm font-medium text-blue-600">HookPilot</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">
              {t.title}
            </h1>
            <p className="mt-3 text-slate-600">{t.subtitle}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">{t.usageToday}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {todayUsage}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">{t.currentPlan}</p>
                <p
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    plan === "pro"
                      ? "bg-purple-100 text-purple-700"
                      : plan === "starter"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {planLabel}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t.topic}
                </label>
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t.placeholderTopic}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t.platform}
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                >
                  <option>TikTok</option>
                  <option>YouTube</option>
                  <option>Facebook Ads</option>
                  <option>Email</option>
                  <option>Landing Page</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t.audience}
                </label>
                <input
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder={t.placeholderAudience}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t.framework}
                </label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                >
                  {frameworkOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={generateHooks}
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? t.generating : t.generate}
              </button>

              <button
                onClick={generateHooks}
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-60"
              >
                {t.regenerate}
              </button>

              {error ? (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm xl:col-span-1">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">
                {t.result}
              </h2>

              {hooks.length > 0 ? (
                <button
                  onClick={copyAll}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {t.copyAll}
                </button>
              ) : null}
            </div>

            {hooks.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-slate-500">
                {t.empty}
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {hooks.map((hook, index) => (
                  <div
                    key={`${hook}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-800"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="mr-2 font-semibold text-blue-600">
                          {index + 1}.
                        </span>
                        {hook}
                      </div>

                      <button
                        onClick={() => copyHook(hook, index)}
                        className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm hover:bg-slate-100"
                      >
                        {copiedIndex === index ? t.copied : t.copyOne}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm xl:col-span-1">
            <h2 className="text-xl font-semibold text-slate-900">
              {t.history}
            </h2>

            {history.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-slate-500">
                {t.noHistory}
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTopic(item.topic)
                      setPlatform(item.platform)
                      setAudience(item.audience)
                      setFramework(item.framework || "default")
                      setHooks(item.hooks)
                    }}
                    className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left hover:bg-slate-100"
                  >
                    <div className="text-sm font-semibold text-slate-900">
                      {item.topic}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      {item.platform} • {item.audience}
                    </div>
                    <div className="mt-2 text-xs text-slate-400">
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
