"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckoutButton } from "@/components/checkout-button";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";

const starterPriceId = process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "";
const proPriceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "";

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [offerSent, setOfferSent] = useState(false);
  const [offerLoading, setOfferLoading] = useState(false);
  const [offerError, setOfferError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("user_email");
    if (saved) setEmail(saved);
  }, []);

  const canSendOffer = useMemo(() => email.trim().length > 3, [email]);

  async function sendOfferEmail() {
    setOfferLoading(true);
    setOfferError("");

    try {
      const res = await fetch("/api/marketing/offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
          Choose the workflow that matches your deal volume
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:mt-5 sm:text-lg md:text-xl md:leading-9">
          Start with listing and follow-up tools, then unlock property ads and listing rewrite workflows when you need a stronger daily system.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_90px_rgba(2,10,20,0.35)] sm:rounded-[34px] sm:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400 sm:text-sm">Your account</div>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:mt-4 sm:text-3xl">Prepare your first upgrade</h2>
          <p className="mt-3 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Use your account email to continue and request the welcome offer before choosing a paid plan.
          </p>

          <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
            <div>
              <label className="mb-3 block text-base font-medium text-slate-200 sm:text-lg">Email</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  localStorage.setItem("user_email", e.target.value);
                }}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-4 py-4 text-base text-white outline-none placeholder:text-slate-500 sm:px-5 sm:text-lg"
              />
            </div>

            <div className="rounded-[24px] border border-cyan-400/25 bg-cyan-400/[0.08] p-5 sm:rounded-[28px]">
              <div className="text-xs uppercase tracking-[0.22em] text-cyan-100 sm:text-sm">Welcome offer</div>
              <div className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">FIRST10</div>
              <p className="mt-3 text-sm leading-7 text-slate-200 sm:text-base">
                Use this code on your first payment if promotion codes are enabled in checkout.
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
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-100 sm:text-sm">What changes by plan</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-4xl">
            Move from listing support to a fuller sales workflow
          </h2>
          <ul className="mt-5 space-y-3 text-base leading-8 text-slate-100 sm:mt-6 sm:space-y-4 sm:text-lg">
            <li>• Faster public-facing property descriptions</li>
            <li>• Better follow-up after inquiries and showings</li>
            <li>• Cleaner ad copy for new listings and promotions</li>
            <li>• Rewrite tools for improving weak listing copy</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 xl:grid-cols-3">
        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(1,8,20,0.35)] sm:rounded-[30px] sm:p-8">
          <div className="text-2xl font-semibold text-white sm:text-3xl">Free</div>
          <div className="mt-4 text-5xl font-semibold tracking-tight text-white sm:mt-5 sm:text-6xl">$0</div>
          <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">Good for trying the listing workflow.</p>
          <ul className="mt-6 space-y-3 text-base leading-8 text-slate-300 sm:mt-8 sm:space-y-4 sm:text-lg">
            <li>• 5 generations per day</li>
            <li>• Listing writer access</li>
            <li>• Good for quick evaluation</li>
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
            For agents who want stronger listing and follow-up tools in one place.
          </p>
          <ul className="mt-6 space-y-3 text-base leading-8 text-slate-200 sm:mt-8 sm:space-y-4 sm:text-lg">
            <li>• 50 generations per day</li>
            <li>• MLS Listing Writer</li>
            <li>• Buyer Follow-Up Sequences</li>
          </ul>
          <div className="mt-8 sm:mt-9">
            <CheckoutButton priceId={starterPriceId} email={email} label="Choose Starter" />
          </div>
        </div>

        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(1,8,20,0.35)] sm:rounded-[30px] sm:p-8">
          <div className="text-2xl font-semibold text-white sm:text-3xl">Pro</div>
          <div className="mt-4 text-5xl font-semibold tracking-tight text-white sm:mt-5 sm:text-6xl">$49</div>
          <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
            For active agents and teams that need a fuller writing workflow.
          </p>
          <ul className="mt-6 space-y-3 text-base leading-8 text-slate-200 sm:mt-8 sm:space-y-4 sm:text-lg">
            <li>• Unlimited generation</li>
            <li>• Facebook Property Ad Writer</li>
            <li>• Listing Rewrite Studio</li>
          </ul>
          <div className="mt-8 sm:mt-9">
            <CheckoutButton priceId={proPriceId} email={email} label="Choose Pro" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
