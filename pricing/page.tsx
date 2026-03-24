"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckoutButton } from "@/components/checkout-button";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { supabase } from "@/lib/supabase";

const starterPriceId = process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "";
const proPriceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "";

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [offerSent, setOfferSent] = useState(false);
  const [offerLoading, setOfferLoading] = useState(false);
  const [offerError, setOfferError] = useState("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user) {
        setEmail(user.email || "");
        setUserId(user.id);
      }
    }
    load();
  }, []);

  const canSendOffer = useMemo(() => email.trim().length > 3, [email]);

  async function sendOfferEmail() {
    setOfferLoading(true);
    setOfferError("");
    try {
      const res = await fetch("/api/marketing/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not send offer");
      setOfferSent(true);
    } catch (error) {
      setOfferError(error instanceof Error ? error.message : "Could not send offer");
    } finally {
      setOfferLoading(false);
    }
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl text-center">
        <SectionBadge>Plans</SectionBadge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl">
          Choose the plan that fits your workflow
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:mt-5 sm:text-lg md:text-xl md:leading-9">
          Start small, upgrade when you need more output, and keep your writing process simple.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_90px_rgba(2,10,20,0.35)] sm:rounded-[34px] sm:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400 sm:text-sm">Your account</div>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:mt-4 sm:text-3xl">Prepare your upgrade</h2>
          <p className="mt-3 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Use your account email to continue and receive a welcome offer before upgrading.
          </p>

          <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
            <div>
              <label className="mb-3 block text-base font-medium text-slate-200 sm:text-lg">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Login to prefill your email"
                className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-4 py-4 text-base text-white outline-none placeholder:text-slate-500 sm:px-5 sm:text-lg"
              />
            </div>

            <div className="rounded-[24px] border border-cyan-400/25 bg-cyan-400/[0.08] p-5 sm:rounded-[28px]">
              <div className="text-xs uppercase tracking-[0.22em] text-cyan-100 sm:text-sm">Welcome offer</div>
              <div className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">FIRST10</div>
              <p className="mt-3 text-sm leading-7 text-slate-200 sm:text-base">
                Use this code on your first payment if it appears during checkout.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <button
                type="button"
                onClick={sendOfferEmail}
                disabled={!canSendOffer || offerLoading}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {offerLoading ? "Sending..." : "Send me the welcome offer"}
              </button>
            </div>

            {offerSent ? <p className="text-sm text-emerald-300 sm:text-base">Offer email sent. Check your inbox.</p> : null}
            {offerError ? <p className="text-sm text-rose-300 sm:text-base">{offerError}</p> : null}
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-400/25 bg-cyan-400/[0.09] p-6 shadow-[0_30px_90px_rgba(2,10,20,0.35)] sm:rounded-[34px] sm:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-100 sm:text-sm">Why people upgrade</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-4xl">
            Save time and keep your copy consistent
          </h2>
          <ul className="mt-5 space-y-3 text-base leading-8 text-slate-100 sm:mt-6 sm:space-y-4 sm:text-lg">
            <li>• Faster writing for listings and follow-ups</li>
            <li>• More polished messaging across your marketing</li>
            <li>• Easy billing management from your account</li>
            <li>• Simple upgrade path as your needs grow</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 xl:grid-cols-3">
        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(1,8,20,0.35)] sm:rounded-[30px] sm:p-8">
          <div className="text-2xl font-semibold text-white sm:text-3xl">Free</div>
          <div className="mt-4 text-5xl font-semibold tracking-tight text-white sm:mt-5 sm:text-6xl">$0</div>
          <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">Good for getting started.</p>
          <ul className="mt-6 space-y-3 text-base leading-8 text-slate-300 sm:mt-8 sm:space-y-4 sm:text-lg">
            <li>• 5 generations per day</li>
            <li>• Basic access only</li>
            <li>• Great for trying the workflow</li>
          </ul>
          <button
            type="button"
            className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base font-medium text-slate-300 sm:mt-9"
          >
            Current free plan
          </button>
        </div>

        <div className="rounded-[26px] border-2 border-cyan-400 bg-white/[0.05] p-6 shadow-[0_25px_80px_rgba(1,8,20,0.35)] sm:rounded-[30px] sm:p-8">
          <div className="inline-flex rounded-full bg-cyan-400 px-4 py-1.5 text-xs font-semibold text-slate-950 sm:text-sm">
            Most popular
          </div>
          <div className="mt-4 text-2xl font-semibold text-white sm:mt-5 sm:text-3xl">Starter</div>
          <div className="mt-4 text-5xl font-semibold tracking-tight text-white sm:mt-5 sm:text-6xl">$19</div>
          <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
            For agents who want listing and follow-up tools in one place.
          </p>
          <ul className="mt-6 space-y-3 text-base leading-8 text-slate-200 sm:mt-8 sm:space-y-4 sm:text-lg">
            <li>• 50 generations per day</li>
            <li>• Listing writer</li>
            <li>• Buyer follow-up writer</li>
          </ul>
          <div className="mt-8 sm:mt-9">
            <CheckoutButton priceId={starterPriceId} email={email} userId={userId} label="Choose Starter" />
          </div>
        </div>

        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(1,8,20,0.35)] sm:rounded-[30px] sm:p-8">
          <div className="text-2xl font-semibold text-white sm:text-3xl">Pro</div>
          <div className="mt-4 text-5xl font-semibold tracking-tight text-white sm:mt-5 sm:text-6xl">$49</div>
          <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
            For teams that need the full writing workflow, including ads.
          </p>
          <ul className="mt-6 space-y-3 text-base leading-8 text-slate-200 sm:mt-8 sm:space-y-4 sm:text-lg">
            <li>• Unlimited generation</li>
            <li>• Property ad writer</li>
            <li>• Full workflow access</li>
          </ul>
          <div className="mt-8 sm:mt-9">
            <CheckoutButton priceId={proPriceId} email={email} userId={userId} label="Choose Pro" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
