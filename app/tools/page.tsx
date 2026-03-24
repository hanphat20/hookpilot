import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { ToolCard } from "@/components/tool-card";

export default function ToolsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <SectionBadge>Real estate tool suite</SectionBadge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Close more property deals with AI
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg md:text-xl md:leading-9">
            Generate listings, ads, and follow-ups that convert buyers without wasting hours rewriting the same content.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
              View plans
            </Link>
          </div>
        </div>

        <section className="mt-10 grid gap-4 sm:gap-6 xl:grid-cols-3">
          <ToolCard
            href="/tools/listing"
            title="Listing Generator"
            subtitle="Starter tool"
            badge="Starter"
            description="Turn raw property details into polished listing descriptions for portals, websites, and social posts."
          />
          <ToolCard
            href="/tools/buyer"
            title="Buyer Follow-up Generator"
            subtitle="Starter tool"
            badge="Starter"
            description="Create stronger follow-up messages for new inquiries, showings, and warm buyer conversations."
          />
          <ToolCard
            href="/tools/ads"
            title="Property Ads Generator"
            subtitle="Pro tool"
            badge="Pro"
            description="Generate ad headlines, primary text, and CTA angles for property campaigns and quick launches."
          />
        </section>

        <section className="mt-10 rounded-[28px] border border-cyan-400/20 bg-cyan-400/[0.08] p-6 sm:rounded-[34px] sm:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-100 sm:text-sm">Quick value</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            One closed deal can pay for months of usage
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-100 sm:text-lg">
            Use the tools to publish faster, respond faster, and move buyers forward with stronger copy.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
