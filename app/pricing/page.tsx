"use client";

import { useState } from "react";
import { CheckoutButton } from "@/components/checkout-button";

const starterPriceId = process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "";
const proPriceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "";

export default function PricingPage() {
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(180deg,#071120_0%,#091428_40%,#0b1322_100%)] px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
            HookPilot Pricing
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">Choose your plan and start building faster</h1>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Free for testing. Starter for solo operators. Pro for teams that need more output, better exports, and stronger landing workflows.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
          <label className="mb-2 block text-sm font-medium text-slate-200">Checkout email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email before choosing a paid plan"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />
          <p className="mt-3 text-xs leading-6 text-slate-400">
            This email is used for Stripe checkout. It avoids the missing-email error and makes paid plans work immediately.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-lg shadow-black/20">
            <div className="text-2xl font-semibold">Free</div>
            <div className="mt-4 text-5xl font-semibold tracking-tight">$0</div>
            <p className="mt-3 text-sm text-slate-400">Good for testing the workflow before upgrading.</p>

            <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-300">
              <li>• 1 basic workspace flow</li>
              <li>• Core hook generation</li>
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
              Most popular
            </div>
            <div className="text-2xl font-semibold">Starter</div>
            <div className="mt-4 text-5xl font-semibold tracking-tight">$19</div>
            <p className="mt-3 text-sm text-slate-300">Best for solo creators and affiliate operators.</p>

            <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-200">
              <li>• AI content generation</li>
              <li>• Caption and script workflows</li>
              <li>• Basic export support</li>
            </ul>

            <div className="mt-8">
              <CheckoutButton priceId={starterPriceId} email={email} label="Choose Starter" />
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-lg shadow-black/20">
            <div className="text-2xl font-semibold">Pro</div>
            <div className="mt-4 text-5xl font-semibold tracking-tight">$49</div>
            <p className="mt-3 text-sm text-slate-300">For teams that want more power and better campaign output.</p>

            <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-200">
              <li>• Unlimited generation workflows</li>
              <li>• Landing page copy generator</li>
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
