"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function sendMagicLink() {
    if (!email.trim()) return;
    setLoading(true);
    setMessage("");

    if (!supabase) {
      setMessage("Supabase is not configured yet.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Magic link sent. Open your email and click Log In.");
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
          Enter your email and we will send you a secure login link.
        </p>

        <div className="mt-7 space-y-5 sm:mt-8">
          <div>
            <label className="mb-3 block text-base font-medium text-slate-200 sm:text-lg">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-4 py-4 text-base text-white outline-none placeholder:text-slate-500 sm:px-5 sm:text-lg"
            />
          </div>

          <button
            type="button"
            onClick={sendMagicLink}
            disabled={loading || !email.trim()}
            className="w-full rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? "Sending..." : "Send magic link"}
          </button>

          {message ? <p className="text-sm text-slate-300">{message}</p> : null}

          <div className="rounded-2xl border border-white/10 bg-[#05101d]/70 p-4 text-sm leading-7 text-slate-400">
            After you receive the email, click <span className="text-slate-200">Log In</span> and you will be redirected back to your dashboard.
          </div>
        </div>
      </div>
    </PageShell>
  );
}
