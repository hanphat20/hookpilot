import Link from "next/link";
import { ToolCard } from "@/components/tool-card";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30%),linear-gradient(180deg,#071120_0%,#091428_45%,#0b1322_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
              Tool Suite
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Working tools</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Use these tools to create hooks, sales content, video scripts, and landing page copy with a cleaner workflow.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
          >
            Back to dashboard
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
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
        </div>
      </div>
    </main>
  );
}
