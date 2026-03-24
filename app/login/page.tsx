"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function sendCode() {
    if (!email.trim()) return;
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: true },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setStep("code");
      setMessage("Check your email for the login code.");
    }
    setLoading(false);
  }

  async function verifyCode() {
    if (!email.trim() || !code.trim()) return;
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });

    if (error) {
      setMessage(error.message);
    } else {
      window.location.href = "/dashboard";
    }
    setLoading(false);
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_90px_rgba(2,10,20,0.35)] sm:rounded-[34px] sm:p-8">
        <SectionBadge>Account access</SectionBadge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-5xl">
          Login to your workspace
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-300 sm:mt-5 sm:text-lg">
          Use your email to receive a one-time code and continue into your account.
        </p>

        <div className="mt-7 space-y-5 sm:mt-8">
          <div>
            <label className="mb-3 block text-base font-medium text-slate-200 sm:text-lg">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-4 py-4 text-base text-white outline-none placeholder:text-slate-500 sm:px-5 sm:text-lg"
            />
          </div>

          {step === "code" ? (
            <div>
              <label className="mb-3 block text-base font-medium text-slate-200 sm:text-lg">Login code</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter the code from your email"
                className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-4 py-4 text-base text-white outline-none placeholder:text-slate-500 sm:px-5 sm:text-lg"
              />
            </div>
          ) : null}

          {step === "email" ? (
            <button
              type="button"
              onClick={sendCode}
              disabled={loading || !email.trim()}
              className="w-full rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading ? "Sending..." : "Send login code"}
            </button>
          ) : (
            <button
              type="button"
              onClick={verifyCode}
              disabled={loading || !email.trim() || !code.trim()}
              className="w-full rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading ? "Verifying..." : "Verify & continue"}
            </button>
          )}

          {message ? <p className="text-sm text-slate-300">{message}</p> : null}
        </div>
      </div>
    </PageShell>
  );
}
