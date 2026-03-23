import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { FeatureCard } from "@/components/feature-card";

export default function HomePage() {
  return (
    <PageShell>
      <section className="grid items-center gap-10 lg:grid-cols-[1.12fr,0.88fr]">
        <div>
          <SectionBadge>AI content workspace</SectionBadge>
          <h1 className="mt-7 max-w-5xl text-6xl font-semibold tracking-tight text-white">
            Create sharper sales content, hooks, and landing copy with a professional workflow
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">
            HookPilot helps creators, sellers, and small teams generate better content faster without messy prompts, weak formatting, or generic output.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/tools"
              className="rounded-2xl bg-cyan-400 px-7 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Open the tools
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
          <div className="text-sm uppercase tracking-[0.22em] text-cyan-100">Inside HookPilot</div>
          <ul className="mt-7 space-y-5 text-lg leading-8 text-slate-100">
            <li>• AI content generation for hooks, captions, and short scripts</li>
            <li>• Cleaner landing page copy with stronger structure</li>
            <li>• Paid upgrade flow with discount offers and renewals</li>
            <li>• A polished interface that is easier to sell and demo</li>
          </ul>
        </div>
      </section>

      <section className="mt-16 grid gap-6 xl:grid-cols-3">
        <FeatureCard
          title="AI Content Generator"
          description="Create hooks, captions, CTA lines, and selling angles with better clarity and faster turnaround."
        />
        <FeatureCard
          title="Landing Page Copy"
          description="Build sharper landing page messaging for offers, products, and campaigns without starting from scratch."
        />
        <FeatureCard
          title="Billing & upgrades"
          description="Use paid upgrades, first-payment offers, and customer card management without a messy user experience."
        />
      </section>
    </PageShell>
  );
}
