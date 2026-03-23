"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "../lib/supabase"

type AuthMode = "login" | "signup"
type Lang = "en" | "vi"

const copy = {
  en: {
    badge: "AI Hook Generator",
    heroTitle: "Create high-converting hooks for ads, videos, and landing pages.",
    heroDesc:
      "HookPilot helps marketers and creators generate viral hooks in seconds with reusable frameworks for performance campaigns.",
    createAccount: "Create account",
    login: "Login",
    signup: "Sign up",
    email: "Email",
    password: "Password",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Enter password",
    authDesc: "Start free and upgrade when you need more generations.",
    processing: "Processing...",
    signupSuccess: "Account created. Please check your email to confirm your account.",
    loginSuccess: "Login successful. Redirecting...",
    resend: "Resend confirmation email",
    resendDone: "Confirmation email sent again. Please check your inbox.",
    resendError: "Unable to resend confirmation email.",
    google: "Continue with Google",
    logout: "Logout",
    signedIn: "You are signed in",
    dashboard: "Open dashboard",
    pricing: "View pricing",
    stats: [
      { value: "10", label: "hooks each generation" },
      { value: "2", label: "languages" },
      { value: "20/day", label: "free usage" },
    ],
    features: [
      {
        title: "Fast hook generation",
        desc: "Create multiple hook angles in seconds for short videos, ads, and product pages.",
      },
      {
        title: "Framework-based output",
        desc: "Use curiosity, pain-point, contrarian, number-led, and story hooks for better testing.",
      },
      {
        title: "Optimized workflow",
        desc: "Clean UI for desktop and mobile with a simple auth flow.",
      },
    ],
  },
  vi: {
    badge: "AI tạo Hook",
    heroTitle: "Tạo hook chuyển đổi cao cho quảng cáo, video và landing page.",
    heroDesc:
      "HookPilot giúp marketer và creator tạo hook viral trong vài giây với framework có thể tái sử dụng cho chiến dịch thực tế.",
    createAccount: "Tạo tài khoản",
    login: "Đăng nhập",
    signup: "Đăng ký",
    email: "Email",
    password: "Mật khẩu",
    emailPlaceholder: "ban@example.com",
    passwordPlaceholder: "Nhập mật khẩu",
    authDesc: "Bắt đầu miễn phí và nâng cấp khi cần nhiều lượt tạo hơn.",
    processing: "Đang xử lý...",
    signupSuccess: "Đã tạo tài khoản. Vui lòng kiểm tra email để xác nhận tài khoản.",
    loginSuccess: "Đăng nhập thành công. Đang chuyển hướng...",
    resend: "Gửi lại email xác nhận",
    resendDone: "Đã gửi lại email xác nhận. Vui lòng kiểm tra hộp thư.",
    resendError: "Không thể gửi lại email xác nhận.",
    google: "Tiếp tục với Google",
    logout: "Đăng xuất",
    signedIn: "Bạn đang đăng nhập",
    dashboard: "Mở dashboard",
    pricing: "Xem bảng giá",
    stats: [
      { value: "10", label: "hook mỗi lần tạo" },
      { value: "2", label: "ngôn ngữ" },
      { value: "20/ngày", label: "lượt miễn phí" },
    ],
    features: [
      {
        title: "Tạo hook cực nhanh",
        desc: "Sinh nhiều góc hook trong vài giây cho video ngắn, quảng cáo và trang bán hàng.",
      },
      {
        title: "Sinh theo framework",
        desc: "Dùng hook tò mò, nỗi đau, ngược chiều, con số và storytelling để test tốt hơn.",
      },
      {
        title: "Quy trình gọn gàng",
        desc: "Giao diện tối ưu desktop và mobile, luồng đăng ký rõ ràng.",
      },
    ],
  },
} as const

export default function HomePage() {
  const [mode, setMode] = useState<AuthMode>("login")
  const [lang, setLang] = useState<Lang>("en")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  const t = useMemo(() => copy[lang], [lang])

  useEffect(() => {
    const savedLang = localStorage.getItem("hookpilot_lang") as Lang | null
    if (savedLang === "en" || savedLang === "vi") setLang(savedLang)

    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const changeLang = (next: Lang) => {
    setLang(next)
    localStorage.setItem("hookpilot_lang", next)
  }

  const handleSignup = async () => {
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
    setMessage(error ? error.message : t.signupSuccess)
  }

  const handleLogin = async () => {
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
    window.location.href = "/dashboard"
  }

  const handleResendConfirmation = async () => {
    if (!email) {
      setMessage(t.resendError)
      return
    }

    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)
    setMessage(error ? error.message || t.resendError : t.resendDone)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUserEmail(null)
    setMessage("")
  }

  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-6 lg:p-8">
          <header className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <a href="/" className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                HookPilot
              </a>
              <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">{t.heroDesc}</p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => changeLang("en")}
                className={`rounded-full px-3 py-2 text-sm ${
                  lang === "en" ? "bg-white text-slate-900" : "text-slate-300"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLang("vi")}
                className={`rounded-full px-3 py-2 text-sm ${
                  lang === "vi" ? "bg-white text-slate-900" : "text-slate-300"
                }`}
              >
                VI
              </button>
            </div>
          </header>

          <section className="grid gap-6 pt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
            <div className="min-w-0">
              <div className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-200">
                {t.badge}
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                {t.heroTitle}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {t.heroDesc}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {t.stats.map((item) => (
                  <div
                    key={item.label}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="text-2xl font-semibold text-white">{item.value}</div>
                    <div className="mt-1 text-sm text-slate-300">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {t.features.map((item) => (
                  <div
                    key={item.title}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-20 min-w-0">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/10 p-4 shadow-xl shadow-blue-950/20 sm:p-6">
                {userEmail ? (
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-emerald-300">{t.signedIn}</p>
                    <h2 className="mt-3 break-all text-xl font-semibold text-white sm:text-2xl">
                      {userEmail}
                    </h2>

                    <div className="mt-6 grid gap-3">
                      <a
                        href="/dashboard"
                        className="relative z-30 block rounded-2xl bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-400"
                      >
                        {t.dashboard}
                      </a>
                      <a
                        href="/pricing"
                        className="relative z-30 block rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
                      >
                        {t.pricing}
                      </a>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="relative z-30 mt-4 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      {t.logout}
                    </button>
                  </div>
                ) : (
                  <div className="min-w-0">
                    <div className="flex gap-2 rounded-full bg-slate-900/70 p-1">
                      <button
                        onClick={() => setMode("login")}
                        className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${
                          mode === "login" ? "bg-white text-slate-900" : "text-slate-300"
                        }`}
                      >
                        {t.login}
                      </button>
                      <button
                        onClick={() => setMode("signup")}
                        className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${
                          mode === "signup" ? "bg-white text-slate-900" : "text-slate-300"
                        }`}
                      >
                        {t.signup}
                      </button>
                    </div>

                    <h2 className="mt-6 text-2xl font-semibold text-white">
                      {mode === "signup" ? t.createAccount : t.login}
                    </h2>
                    <p className="mt-2 text-sm text-slate-300">{t.authDesc}</p>

                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-200">{t.email}</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t.emailPlaceholder}
                          className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-200">{t.password}</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={t.passwordPlaceholder}
                          className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                        />
                      </div>

                      <button
                        onClick={mode === "signup" ? handleSignup : handleLogin}
                        disabled={loading}
                        className="w-full rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-400 disabled:opacity-60"
                      >
                        {loading ? t.processing : mode === "signup" ? t.signup : t.login}
                      </button>

                      <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-60"
                      >
                        {t.google}
                      </button>

                      {mode === "signup" ? (
                        <button
                          onClick={handleResendConfirmation}
                          disabled={loading || !email}
                          className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                        >
                          {t.resend}
                        </button>
                      ) : null}
                    </div>

                    {message ? (
                      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200">
                        {message}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
