import Link from "next/link";
import { BillingPortalButton } from "@/components/billing-portal-button";

export default function DashboardPage() {
  const currentPlan = "free";
  const stripeCustomerId = "cus_demo_replace_me";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(180deg,#071120_0%,#091428_40%,#0b1322_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-cyan-950/20">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
                Billing & tools
              </div>
              <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                Open your tools, upgrade your plan, and manage the saved card used for subscription renewal.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Current plan</div>
                  <div className="mt-1 text-lg font-semibold">{currentPlan}</div>
                </div>

                <Link
                  href="/pricing"
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                >
                  Upgrade plan
                </Link>
              </div>
            </div>

            <div className="w-full max-w-sm rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/10 p-5">
              <div className="text-sm uppercase tracking-[0.18em] text-cyan-100">Auto-renew</div>
              <h2 className="mt-3 text-xl font-semibold">Saved card & renewal settings</h2>
              <p className="mt-3 text-sm leading-6 text-slate-100">
                Customers should be able to update card details and keep automatic renewal active from the billing area.
              </p>
              <div className="mt-5">
                <BillingPortalButton customerId={stripeCustomerId} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
