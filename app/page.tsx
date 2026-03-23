import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { FeatureCard } from "@/components/feature-card";

export default function HomePage() {
  return (
    <PageShell>
      <section className="grid items-center gap-10 lg:grid-cols-[1.12fr,0.88fr]">
        <div>
          <SectionBadge>Real estate content system</SectionBadge>
          <h1 className="mt-7 max-w-5xl text-6xl font-semibold tracking-tight text-white">
            Close more real estate deals with better listings, ads, and buyer follow-ups
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">
            HookPilot helps agents and small property teams generate listing descriptions, ad copy, and follow-up scripts in a cleaner workflow.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/tools/listing"
              className="rounded-2xl bg-cyan-400 px-7 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Generate listing
            </Link>
            <Link
              href="/pricing"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-medium text-white transition hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>
        </div>

        <div className="rounded-[34px] border border-cyan-400/18 bg-cyan-400/[0.09] p-8 shadow-[0_35px_100px_rgba(2,10,20,0.38)]">
          <div className="text-sm uppercase tracking-[0.22em] text-cyan-100">Built for agents</div>
          <ul className="mt-7 space-y-5 text-lg leading-8 text-slate-100">
            <li>• Listing descriptions for property pages and portals</li>
            <li>• Buyer follow-up scripts after viewings and new leads</li>
            <li>• Property ad copy for Facebook and quick campaign launches</li>
            <li>• Paid upgrade flow with first-payment discount and auto-renew</li>
          </ul>
        </div>
      </section>

      <section className="mt-16 grid gap-6 xl:grid-cols-3">
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
