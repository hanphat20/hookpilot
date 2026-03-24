import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { ToolCard } from "@/components/tool-card";

export default function ToolsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <SectionBadge>Professional tools</SectionBadge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Tools built around how agents actually work
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg md:text-xl md:leading-9">
            Start with listing copy, move into buyer follow-up, then unlock ad copy and listing rewrite workflows when you need a stronger daily system.
          </p>
        </div>

        <section className="mt-10 grid gap-4 sm:gap-6 xl:grid-cols-2">
          <ToolCard
            href="/tools/listing"
            title="MLS Listing Writer"
            subtitle="Included in Starter"
            badge="Starter"
            description="Turn property notes into a ready-to-use listing structure with title, highlights, description, and call to action."
          />
          <ToolCard
            href="/tools/buyer"
            title="Buyer Follow-Up Sequences"
            subtitle="Included in Starter"
            badge="Starter"
            description="Generate follow-up messages for new inquiries, after-showing check-ins, and warmer buyer conversations."
          />
          <ToolCard
            href="/tools/ads"
            title="Facebook Property Ad Writer"
            subtitle="Included in Pro"
            badge="Pro"
            description="Create social ad headlines, primary text, and CTA directions for new listings, price drops, and promotion pushes."
          />
          <ToolCard
            href="/tools/rewrite"
            title="Listing Rewrite Studio"
            subtitle="Included in Pro"
            badge="Pro"
            description="Rewrite weaker property copy into a stronger version for luxury tone, shorter format, or more persuasive positioning."
          />
        </section>

        <section className="mt-10 rounded-[28px] border border-cyan-400/20 bg-cyan-400/[0.08] p-6 sm:rounded-[34px] sm:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-100 sm:text-sm">Why users stay</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            It fits real estate work better than a generic AI writer
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-100 sm:text-lg">
            The output is structured around listing pages, buyer conversations, and property marketing tasks instead of generic blog or social content.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
