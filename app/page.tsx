import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { FeatureCard } from "@/components/feature-card";

export default function HomePage() {
  return (
    <PageShell>
      <section className="grid items-center gap-8 lg:grid-cols-[1.12fr,0.88fr] lg:gap-10">
        <div>
          <SectionBadge>Real estate AI system</SectionBadge>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Close more property deals with AI
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg lg:text-xl lg:leading-9">
            Generate listings, ads, and buyer follow-ups that help agents publish faster and convert more serious buyers.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/tools/listing"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Generate your first listing
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>

          <div className="mt-5 text-sm text-slate-400">
            Trusted by agents and small property teams worldwide
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-400/18 bg-cyan-400/[0.09] p-6 shadow-[0_35px_100px_rgba(2,10,20,0.38)] sm:rounded-[34px] sm:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-100 sm:text-sm">Why it sells</div>
          <ul className="mt-6 space-y-4 text-base leading-8 text-slate-100 sm:space-y-5 sm:text-lg">
            <li>• Listing descriptions for portals and property pages</li>
            <li>• Buyer follow-up scripts after viewings and new inquiries</li>
            <li>• Property ad copy for Facebook campaigns</li>
            <li>• Discounted first payment and auto-renew ready flow</li>
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
