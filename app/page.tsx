import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { FeatureCard } from "@/components/feature-card";

export default function HomePage() {
  return (
    <PageShell>
      <section className="grid items-center gap-8 lg:grid-cols-[1.12fr,0.88fr] lg:gap-10">
        <div>
          <SectionBadge>Real estate content system</SectionBadge>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:mt-7 sm:text-5xl lg:text-6xl">
            Close more real estate deals with better listings, ads, and buyer follow-ups
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg lg:text-xl lg:leading-9">
            HookPilot helps agents and small property teams generate listing descriptions, ad copy, and follow-up scripts in a cleaner workflow.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/tools/listing"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 sm:px-7"
            >
              Generate listing
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10 sm:px-7"
            >
              View pricing
            </Link>
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-400/18 bg-cyan-400/[0.09] p-6 shadow-[0_35px_100px_rgba(2,10,20,0.38)] sm:rounded-[34px] sm:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-100 sm:text-sm">Built for agents</div>
          <ul className="mt-6 space-y-4 text-base leading-8 text-slate-100 sm:mt-7 sm:space-y-5 sm:text-lg">
            <li>• Listing descriptions for property pages and portals</li>
            <li>• Buyer follow-up scripts after viewings and new leads</li>
            <li>• Property ad copy for Facebook and quick campaign launches</li>
            <li>• Paid upgrade flow with first-payment discount and auto-renew</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 xl:grid-cols-3">
        <FeatureCard
          title="Listing generator"
          description="Turn raw property details into polished descriptions that feel more professional and easier to publish."
        />
        <FeatureCard
          title="Buyer scripts"
          description="Create follow-up messages and lead-nurture scripts that keep conversations moving toward a deal."
        />
        <FeatureCard
          title="Property ads"
          description="Generate ad text, headlines, and angles for listings without spending time rewriting the same ideas."
        />
      </section>
    </PageShell>
  );
}
