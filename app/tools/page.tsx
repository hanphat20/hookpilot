import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { ToolCard } from "@/components/tool-card";

export default function ToolsPage() {
  return (
    <PageShell>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          <SectionBadge>Tool suite</SectionBadge>
          <h1 className="mt-6 text-6xl font-semibold tracking-tight text-white">Working tools</h1>
          <p className="mt-5 text-xl leading-9 text-slate-300">
            Use these tools to create hooks, sales content, video scripts, and landing page copy with a cleaner workflow.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-medium text-white transition hover:bg-white/10"
        >
          Back to dashboard
        </Link>
      </div>

      <section className="mt-12 grid gap-6 xl:grid-cols-3">
        <ToolCard
          href="/tools/content"
          title="AI Content Generator"
          subtitle="Starter tool"
          badge="Starter"
          description="Generate hooks, captions, CTA lines, and video scripts from a keyword, platform, and campaign goal."
        />
        <ToolCard
          href="/tools/hooks"
          title="Viral Hook Generator"
          subtitle="Free tool"
          badge="Free"
          description="Create multiple hook lines that focus on pain points, benefits, urgency, or emotion for your niche."
        />
        <ToolCard
          href="/tools/landing"
          title="Landing Page Copy Generator"
          subtitle="Pro tool"
          badge="Pro"
          description="Build landing page messaging from your brand, offer, and CTA so you can move to code faster."
        />
      </section>
    </PageShell>
  );
}
