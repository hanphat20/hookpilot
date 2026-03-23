"use client";

import { useState } from "react";
import { CheckoutButton } from "@/components/checkout-button";

const starterPriceId = process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "";
const proPriceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "";

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [offerSent, setOfferSent] = useState(false);
  const [offerLoading, setOfferLoading] = useState(false);
  const [offerError, setOfferError] = useState("");
  const [promotionCode, setPromotionCode] = useState("FIRST10");

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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(180deg,#071120_0%,#091428_40%,#0b1322_100%)] px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
            Pricing & First-Payment Offer
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">Pay less on your first upgrade</h1>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Collect the first-payment offer, enter your code, and upgrade with a stronger conversion flow.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <label className="mb-2 block text-sm font-medium text-slate-200">Checkout email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email first"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <label className="mb-2 mt-5 block text-sm font-medium text-slate-200">First-order discount code</label>
            <input
              value={promotionCode}
              onChange={(e) => setPromotionCode(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
            <p className="mt-3 text-xs leading-6 text-slate-400">
              Suggested first-order code: FIRST10. Enable promotion codes in Stripe and create a 10% promotion code there.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={sendOfferEmail}
                disabled={!email || offerLoading}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {offerLoading ? "Sending..." : "Send me the 10% offer"}
              </button>

              {offerSent ? <span className="text-sm text-emerald-300">Offer email sent.</span> : null}
              {offerError ? <span className="text-sm text-rose-300">{offerError}</span> : null}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-cyan-400/30 bg-cyan-400/10 p-6">
            <div className="text-sm uppercase tracking-[0.18em] text-cyan-100">Conversion boost</div>
            <h2 className="mt-3 text-2xl font-semibold">First-payment offer</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100">
              <li>• 10% off for first payment</li>
              <li>• Email reminder before expiry</li>
              <li>• Automatic lock when the plan expires</li>
              <li>• Payment-failed reminder email</li>
            </ul>
          </section>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-lg shadow-black/20">
            <div className="text-2xl font-semibold">Free</div>
            <div className="mt-4 text-5xl font-semibold tracking-tight">$0</div>
            <p className="mt-3 text-sm text-slate-400">Good for testing before upgrading.</p>
            <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-300">
              <li>• 5 generations per day</li>
              <li>• Basic hook workflow</li>
              <li>• No advanced exports</li>
            </ul>
            <button
              type="button"
              className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-300"
            >
              Current free plan
            </button>
          </section>

          <section className="relative rounded-[2rem] border-2 border-cyan-400 bg-white/[0.05] p-7 shadow-xl shadow-cyan-950/30">
            <div className="absolute right-5 top-5 rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-slate-950">
              Best entry offer
            </div>
            <div className="text-2xl font-semibold">Starter</div>
            <div className="mt-4 text-5xl font-semibold tracking-tight">$19</div>
            <p className="mt-3 text-sm text-slate-300">For solo sellers and creators who need consistent daily output.</p>
            <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-200">
              <li>• 50 generations per day</li>
              <li>• Captions and scripts</li>
              <li>• Basic export support</li>
            </ul>
            <div className="mt-8">
              <CheckoutButton priceId={starterPriceId} email={email} label="Choose Starter" />
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-lg shadow-black/20">
            <div className="text-2xl font-semibold">Pro</div>
            <div className="mt-4 text-5xl font-semibold tracking-tight">$49</div>
            <p className="mt-3 text-sm text-slate-300">For teams that need more output and stronger paid workflows.</p>
            <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-200">
              <li>• Unlimited generation</li>
              <li>• Landing page generator</li>
              <li>• Full export and premium features</li>
            </ul>
            <div className="mt-8">
              <CheckoutButton priceId={proPriceId} email={email} label="Choose Pro" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
