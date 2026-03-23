"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "../../lib/supabase"

type Lang = "en" | "vi"
type Tone = "Curiosity" | "Pain Point" | "Contrarian" | "Story" | "Number-led"
type Plan = "free" | "starter" | "pro"

type HistoryItem = {
  id: string
  createdAt: string
  topic: string
  audience: string
  language: string
  tone: Tone
  hooks: string[]
}

const dashboardCopy = {
  en: {
    title: "Hook Generator Dashboard",
    subtitle: "Generate clean hook angles for content, paid ads, affiliate creatives, and landing pages.",
    topic: "Topic or offer",
    topicPlaceholder: "Example: Online casino welcome bonus for new users",
    audience: "Audience",
    audiencePlaceholder: "Example: New users in Vietnam",
    language: "Language",
    tone: "Framework",
    generate: "Generate hooks",
    generating: "Generating...",
    result: "Generated hooks",
    empty: "Your generated hooks will appear here.",
    recent: "Recent generations",
    noHistory: "No history yet.",
    signout: "Logout",
    pricing: "Pricing",
    home: "Home",
    helper: "Use short, clear input for better output.",
    signedIn: "Signed in as",
    checking: "Checking session...",
    billing: "Manage billing",
    billingLoading: "Opening billing...",
    currentPlan: "Current plan",
    usage: "Usage access",
    usageDesc: "Free plan is limited. Paid plans unlock unlimited generations.",
  },
  vi: {
    title: "Dashboard tạo Hook",
    subtitle: "Tạo hook rõ ràng cho content, quảng cáo trả phí, affiliate và landing page.",
    topic: "Chủ đề hoặc ưu đãi",
    topicPlaceholder: "Ví dụ: Thưởng chào mừng casino online cho người mới",
    audience: "Tệp khách hàng",
    audiencePlaceholder: "Ví dụ: Người dùng mới tại Việt Nam",
    language: "Ngôn ngữ",
    tone: "Framework",
    generate: "Tạo hook",
    generating: "Đang tạo...",
    result: "Kết quả hook",
    empty: "Hook được tạo sẽ hiện tại đây.",
    recent: "Lịch sử gần đây",
    noHistory: "Chưa có lịch sử.",
    signout: "Đăng xuất",
    pricing: "Bảng giá",
    home: "Trang chủ",
    helper: "Nhập ngắn gọn, rõ ràng để ra kết quả tốt hơn.",
    signedIn: "Đăng nhập bởi",
    checking: "Đang kiểm tra phiên đăng nhập...",
    billing: "Quản lý thanh toán",
    billingLoading: "Đang mở cổng thanh toán...",
    currentPlan: "Gói hiện tại",
    usage: "Quyền sử dụng",
    usageDesc: "Gói miễn phí bị giới hạn. Gói trả phí mở khóa tạo không giới hạn.",
  },
} as const

const toneTemplates: Record<
  Tone,
  { en: (topic: string, audience: string) => string; vi: (topic: string, audience: string) => string }[]
> = {
  Curiosity: [
    {
      en: (topic, audience) => `Why are smart ${audience} suddenly paying attention to ${topic}?`,
      vi: (topic, audience) => `Vì sao ${audience} đang bắt đầu chú ý mạnh tới ${topic}?`,
    },
    {
      en: (topic, audience) => `Most ${audience} ignore this angle about ${topic} until it is too late.`,
      vi: (topic, audience) => `Đa số ${audience} đều bỏ qua góc này của ${topic} cho tới khi quá muộn.`,
    },
  ],
  "Pain Point": [
    {
      en: (topic, audience) => `Still struggling to make ${topic} work for ${audience}? Start here.`,
      vi: (topic, audience) => `Vẫn đang loay hoay để ${topic} hiệu quả với ${audience}? Bắt đầu từ đây.`,
    },
    {
      en: (topic, audience) =>
        `The biggest mistake ${audience} make with ${topic} is easier to fix than you think.`,
      vi: (topic, audience) =>
        `Sai lầm lớn nhất mà ${audience} mắc phải với ${topic} thật ra dễ sửa hơn bạn nghĩ.`,
    },
  ],
  Contrarian: [
    {
      en: (topic, audience) =>
        `Stop copying everyone else: ${topic} works better for ${audience} when you do this instead.`,
      vi: (topic, audience) => `Đừng làm giống số đông: ${topic} sẽ hiệu quả hơn với ${audience} nếu làm cách này.`,
    },
    {
      en: (topic, audience) =>
        `What if the usual advice about ${topic} is exactly why ${audience} are losing conversions?`,
      vi: (topic, audience) =>
        `Điều gì xảy ra nếu lời khuyên quen thuộc về ${topic} chính là lý do ${audience} mất chuyển đổi?`,
    },
  ],
  Story: [
    {
      en: (topic, audience) => `We tested ${topic} for ${audience}, and the first result surprised everyone.`,
      vi: (topic, audience) => `Chúng tôi đã thử ${topic} cho ${audience}, và kết quả đầu tiên khiến ai cũng bất ngờ.`,
    },
    {
      en: (topic, audience) =>
        `A simple change in ${topic} helped ${audience} get a stronger response almost immediately.`,
      vi: (topic, audience) =>
        `Một thay đổi nhỏ trong ${topic} đã giúp ${audience} có phản hồi tốt hơn gần như ngay lập tức.`,
    },
  ],
  "Number-led": [
    {
      en: (topic, audience) => `7 hook angles to make ${topic} hit harder with ${audience}.`,
      vi: (topic, audience) => `7 góc hook giúp ${topic} đánh trúng ${audience} hơn.`,
    },
    {
      en: (topic, audience) => `3 reasons ${audience} respond faster when ${topic} is framed this way.`,
      vi: (topic, audience) => `3 lý do ${audience} phản hồi nhanh hơn khi ${topic} được triển khai theo cách này.`,
    },
  ],
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function DashboardPage() {
  const [lang, setLang] = useState<Lang>("en")
  const [userId, setUserId] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [topic, setTopic] = useState("")
  const [audience, setAudience] = useState("")
  const [language, setLanguage] = useState("English")
  const [tone, setTone] = useState<Tone>("Curiosity")
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [billingLoading, setBillingLoading] = useState(false)
  const [hooks, setHooks] = useState<string[]>([])
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [currentPlan, setCurrentPlan] = useState<Plan>("free")

  const t = dashboardCopy[lang]

  useEffect(() => {
    const savedLang = localStorage.getItem("hookpilot_lang") as Lang | null
    if (savedLang === "en" || savedLang === "vi") setLang(savedLang)

    const raw = localStorage.getItem("hookpilot_history")
    if (raw) {
      try {
        setHistory(JSON.parse(raw))
      } catch {}
    }

    supabase.auth.getSession().then(async ({ data }) => {
      const sessionUser = data.session?.user
      if (!sessionUser) {
        window.location.href = "/"
        return
      }

      setUserId(sessionUser.id)
      setUserEmail(sessionUser.email ?? "")

      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("plan,status")
        .eq("auth_user_id", sessionUser.id)
        .in("status", ["active", "trialing"])
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (subscription?.plan === "starter" || subscription?.plan === "pro") {
        setCurrentPlan(subscription.plan)
      } else {
        setCurrentPlan("free")
      }

      setChecking(false)
    })
  }, [])

  const helperHooks = useMemo(() => {
    if (!topic.trim() || !audience.trim()) return []

    const selected = toneTemplates[tone]
    const currentLang = lang === "vi" ? "vi" : "en"

    return [
      selected[0][currentLang](topic.trim(), audience.trim()),
      selected[1][currentLang](topic.trim(), audience.trim()),
      currentLang === "vi"
        ? `Nếu ${topic.trim()} chưa tạo chuyển đổi tốt với ${audience.trim()}, hãy thử góc này trước.`
        : `If ${topic.trim()} is not converting for ${audience.trim()}, test this angle first.`,
      currentLang === "vi"
        ? `${audience.trim()} sẽ dừng lại ngay khi thấy cách tiếp cận mới này cho ${topic.trim()}.`
        : `${audience.trim()} will stop scrolling when they see this new angle for ${topic.trim()}.`,
      currentLang === "vi"
        ? `Cách triển khai ${topic.trim()} đang bị đánh giá thấp nhất với ${audience.trim()}.`
        : `The most underrated way to position ${topic.trim()} for ${audience.trim()}.`,
      currentLang === "vi"
        ? `Đừng bán ${topic.trim()} theo kiểu cũ nếu bạn đang nhắm tới ${audience.trim()}.`
        : `Stop selling ${topic.trim()} the old way if you want better traction with ${audience.trim()}.`,
      currentLang === "vi"
        ? `Chỉ một thay đổi nhỏ trong hook của ${topic.trim()} cũng có thể làm ${audience.trim()} phản hồi mạnh hơn.`
        : `One small hook change can make ${audience.trim()} respond faster to ${topic.trim()}.`,
      currentLang === "vi"
        ? `Phần lớn chiến dịch ${topic.trim()} thất bại vì bỏ qua insight này của ${audience.trim()}.`
        : `Most ${topic.trim()} campaigns fail because they ignore this insight about ${audience.trim()}.`,
      currentLang === "vi"
        ? `Đây là format hook dễ test nhất cho ${topic.trim()} nếu đối tượng là ${audience.trim()}.`
        : `This is the easiest hook format to test for ${topic.trim()} when targeting ${audience.trim()}.`,
      currentLang === "vi"
        ? `Tăng lực hút cho ${topic.trim()} bằng đúng nỗi quan tâm của ${audience.trim()}.`
        : `Increase the pull of ${topic.trim()} by using the real concern of ${audience.trim()}.`,
    ]
  }, [topic, audience, tone, lang])

  const generateHooks = async () => {
  if (!topic || !audience) return

  setLoading(true)

  // check usage
  const res = await fetch("/api/usage/check", {
    method: "POST",
    body: JSON.stringify({ userId }),
  })

  const data = await res.json()

  if (currentPlan === "free" && data.count >= 20) {
    alert("🚫 Hết lượt miễn phí hôm nay → nâng cấp để tiếp tục")
    window.location.href = "/pricing"
    return
  }

  // generate AI
  const aiRes = await fetch("/api/generate", {
    method: "POST",
    body: JSON.stringify({ topic, audience }),
  })

  const aiData = await aiRes.json()
  setHooks(aiData.hooks)

  // tăng usage
  await fetch("/api/usage/increment", {
    method: "POST",
    body: JSON.stringify({ userId }),
  })

  setLoading(false)
}
  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  if (checking) {
    return (
      <main className="min-h-screen px-4 py-8 text-center text-white">
        {t.checking}
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-300">HookPilot</p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{t.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{t.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                {t.signedIn}: <span className="font-semibold text-white">{userEmail || "Guest"}</span>
              </div>
              <a href="/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
                {t.home}
              </a>
              <a href="/pricing" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
                {t.pricing}
              </a>
              <button
                onClick={openBillingPortal}
                disabled={billingLoading || currentPlan === "free"}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 disabled:opacity-60"
              >
                {billingLoading ? t.billingLoading : t.billing}
              </button>
              <button onClick={signOut} className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400">
                {t.signout}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-300">{t.currentPlan}</p>
              <h3
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                  currentPlan === "pro"
                    ? "bg-purple-500/20 text-purple-200"
                    : currentPlan === "starter"
                    ? "bg-blue-500/20 text-blue-200"
                    : "bg-white/10 text-slate-100"
                }`}
              >
                {currentPlan === "pro" ? "Pro" : currentPlan === "starter" ? "Starter" : "Free"}
              </h3>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:col-span-2">
              <p className="text-sm text-slate-300">{t.usage}</p>
              <p className="mt-3 text-sm text-slate-200">{t.usageDesc}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[28px] border border-white/10 bg-white/5 p-4 sm:p-6">
              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">{t.topic}</label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={4}
                    placeholder={t.topicPlaceholder}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">{t.audience}</label>
                  <input
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder={t.audiencePlaceholder}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">{t.language}</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-blue-400"
                    >
                      <option>English</option>
                      <option>Vietnamese</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">{t.tone}</label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value as Tone)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-blue-400"
                    >
                      <option>Curiosity</option>
                      <option>Pain Point</option>
                      <option>Contrarian</option>
                      <option>Story</option>
                      <option>Number-led</option>
                    </select>
                  </div>
                </div>

                <p className="text-sm text-slate-400">{t.helper}</p>

                <button
                  onClick={generateHooks}
                  disabled={loading || !topic.trim() || !audience.trim()}
                  className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-400 disabled:opacity-60"
                >
                  {loading ? t.generating : t.generate}
                </button>
              </div>
            </section>

            <section className="grid gap-6">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-white">{t.result}</h2>
                <div className="mt-4 grid gap-3">
                  {hooks.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/40 px-4 py-6 text-sm text-slate-400">
                      {t.empty}
                    </div>
                  ) : (
                    hooks.map((hook, index) => (
                      <div key={`${hook}-${index}`} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                          Hook {index + 1}
                        </div>
                        <p className="text-sm leading-6 text-slate-100 sm:text-base">{hook}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-white">{t.recent}</h2>
                <div className="mt-4 grid gap-3">
                  {history.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/40 px-4 py-6 text-sm text-slate-400">
                      {t.noHistory}
                    </div>
                  ) : (
                    history.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <div className="text-sm font-semibold text-white">{item.topic}</div>
                          <div className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-400">
                          {item.audience} · {item.language} · {item.tone}
                        </div>
                        <div className="mt-3 text-sm text-slate-300">{item.hooks[0]}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
