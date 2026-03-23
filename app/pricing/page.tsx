"use client";

import { useMemo, useState } from "react";
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
  const [promotionCode, setPromotionCode] = useState("FIRST10");

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
        <SectionBadge>Pricing & first-payment offer</SectionBadge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white md:text-6xl">
          Upgrade faster with a clearer checkout flow
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl md:leading-9">
          Enter your email once, unlock your first-payment offer, and choose the plan that fits your daily content output.
        </p>
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
          <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Checkout setup</div>
          <h2 className="mt-4 text-3xl font-semibold text-white">Prepare your first upgrade</h2>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-300">
            Use one email for billing, collect your first-payment discount, then move straight into the plan you want.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <label className="mb-3 block text-lg font-medium text-slate-200">Checkout email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email first"
                className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="mb-3 block text-lg font-medium text-slate-200">First-order discount code</label>
              <input
                value={promotionCode}
                onChange={(e) => setPromotionCode(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none"
              />
              <p className="mt-3 text-base leading-7 text-slate-400">
                Suggested code: FIRST10. Enable promotion codes in Stripe and create the 10% promotion code there.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={sendOfferEmail}
                disabled={!canSendOffer || offerLoading}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {offerLoading ? "Sending..." : "Send me the 10% offer"}
              </button>
            </div>

            {offerSent ? <p className="text-base text-emerald-300">Offer email sent. Check your inbox.</p> : null}
            {offerError ? <p className="text-base text-rose-300">{offerError}</p> : null}
          </div>
        </div>

        <div className="rounded-[34px] border border-cyan-400/25 bg-cyan-400/[0.09] p-8 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
          <div className="text-sm uppercase tracking-[0.22em] text-cyan-100">First-payment offer</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">Give customers a stronger reason to upgrade now</h2>
          <ul className="mt-6 space-y-4 text-lg leading-8 text-slate-100">
            <li>• 10% off for the first payment</li>
            <li>• Reminder emails before expiry</li>
            <li>• Lock back to free if the plan expires</li>
            <li>• Payment-failed reminder flow</li>
          </ul>

          <div className="mt-8 rounded-[28px] border border-cyan-400/20 bg-[#05101d]/30 p-6">
            <div className="text-sm uppercase tracking-[0.22em] text-slate-300">Suggested copy</div>
            <p className="mt-3 text-lg leading-8 text-white">
              Upgrade today, use code <span className="font-semibold text-cyan-300">FIRST10</span>, and save on your first payment.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-3">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_25px_80px_rgba(1,8,20,0.35)]">
          <div className="text-3xl font-semibold text-white">Free</div>
          <div className="mt-5 text-6xl font-semibold tracking-tight text-white">$0</div>
          <p className="mt-4 text-lg leading-8 text-slate-300">Good for testing the workflow before upgrading.</p>
          <ul className="mt-8 space-y-4 text-lg leading-8 text-slate-300">
            <li>• 5 generations per day</li>
            <li>• Basic hook workflow</li>
            <li>• No advanced exports</li>
          </ul>
          <button
            type="button"
            className="mt-9 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base font-medium text-slate-300"
          >
            Current free plan
          </button>
        </div>

        <div className="rounded-[30px] border-2 border-cyan-400 bg-white/[0.05] p-8 shadow-[0_25px_80px_rgba(1,8,20,0.35)]">
          <div className="inline-flex rounded-full bg-cyan-400 px-4 py-1.5 text-sm font-semibold text-slate-950">
            Best starter plan
          </div>
          <div className="mt-5 text-3xl font-semibold text-white">Starter</div>
          <div className="mt-5 text-6xl font-semibold tracking-tight text-white">$19</div>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            For solo sellers and creators who need reliable daily output.
          </p>
          <ul className="mt-8 space-y-4 text-lg leading-8 text-slate-200">
            <li>• 50 generations per day</li>
            <li>• Captions and script workflows</li>
            <li>• Basic export support</li>
          </ul>
          <div className="mt-9">
            <CheckoutButton priceId={starterPriceId} email={email} label="Choose Starter" />
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_25px_80px_rgba(1,8,20,0.35)]">
          <div className="text-3xl font-semibold text-white">Pro</div>
          <div className="mt-5 text-6xl font-semibold tracking-tight text-white">$49</div>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            For teams that need stronger output, better exports, and more advanced copy tools.
          </p>
          <ul className="mt-8 space-y-4 text-lg leading-8 text-slate-200">
            <li>• Unlimited generation</li>
            <li>• Landing page generator</li>
            <li>• Full export and premium features</li>
          </ul>
          <div className="mt-9">
            <CheckoutButton priceId={proPriceId} email={email} label="Choose Pro" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
