import Link from "next/link";
import { BillingPortalButton } from "@/components/billing-portal-button";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";

export default function DashboardPage() {
  const currentPlan = "Free";
  const stripeCustomerId = "cus_demo_replace_me";

  return (
    <PageShell>
      <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-9 shadow-[0_35px_100px_rgba(2,10,20,0.38)]">
        <div className="grid gap-8 lg:grid-cols-[1.45fr,0.9fr]">
          <div>
            <SectionBadge>Billing & tools</SectionBadge>
            <h1 className="mt-6 text-6xl font-semibold tracking-tight text-white">Dashboard</h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-slate-300">
              Open your tools, upgrade your plan, and manage the saved card used for subscription renewal.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="rounded-[24px] border border-white/10 bg-[#06101d]/80 px-6 py-5">
                <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Current plan</div>
                <div className="mt-2 text-3xl font-semibold text-white">{currentPlan}</div>
              </div>

              <Link
                href="/pricing"
                className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-medium text-white transition hover:bg-white/10"
              >
                Upgrade plan
              </Link>
            </div>
          </div>

          <div className="rounded-[30px] border border-cyan-400/25 bg-cyan-400/[0.09] p-8">
            <div className="text-sm uppercase tracking-[0.22em] text-cyan-100">Auto-renew</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white">
              Saved card & renewal settings
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-100">
              Customers should be able to update card details and keep automatic renewal active from the billing area.
            </p>

            <div className="mt-8">
              <BillingPortalButton customerId={stripeCustomerId} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
