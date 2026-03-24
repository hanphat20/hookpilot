import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { ToolCard } from "@/components/tool-card";

export default function ToolsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <SectionBadge>Tools</SectionBadge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Professional writing tools for property marketing
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg md:text-xl md:leading-9">
            Choose the tool you need, generate polished copy quickly, and present properties with more confidence.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/tools/listing"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Start with listings
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10"
            >
              Compare plans
            </Link>
          </div>
        </div>

        <section className="mt-10 grid gap-4 sm:gap-6 xl:grid-cols-3">
          <ToolCard
            href="/tools/listing"
            title="Listing Writer"
            subtitle="Included in Starter"
            badge="Starter"
            description="Turn property details into polished listing descriptions for websites, portals, and social posts."
          />
          <ToolCard
            href="/tools/buyer"
            title="Buyer Follow-up Writer"
            subtitle="Included in Starter"
            badge="Starter"
            description="Create thoughtful follow-up messages for inquiries, viewings, and warm buyer conversations."
          />
          <ToolCard
            href="/tools/ads"
            title="Property Ad Writer"
            subtitle="Included in Pro"
            badge="Pro"
            description="Generate ad headlines, primary text, and CTA ideas for property campaigns and promotions."
          />
        </section>
      </div>
    </PageShell>
  );
}
