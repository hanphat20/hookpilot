import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { ToolCard } from "@/components/tool-card";

export default function ToolsPage() {
  return (
    <PageShell>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between xl:gap-8">
        <div className="max-w-4xl">
          <SectionBadge>Real estate tool suite</SectionBadge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl">
            Agent workflow tools
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-300 sm:mt-5 sm:text-lg md:text-xl md:leading-9">
            Create listing descriptions, buyer follow-up scripts, and property ad copy with a cleaner workflow.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Unlock full tools
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 xl:grid-cols-3">
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
    </PageShell>
  );
}
