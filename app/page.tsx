import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { FeatureCard } from "@/components/feature-card";

export default function HomePage() {
  return (
    <PageShell>
      <section className="grid items-center gap-8 lg:grid-cols-[1.12fr,0.88fr] lg:gap-10">
        <div>
          <SectionBadge>Real estate writing workspace</SectionBadge>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Write better listings, follow up faster, and move buyers forward
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg lg:text-xl lg:leading-9">
            Built for agents, brokers, and active property teams that need clearer listing copy, stronger buyer follow-ups, and faster marketing output without starting from scratch every time.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/tools/listing"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Try the listing writer
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10"
            >
              View plans
            </Link>
          </div>

          <div className="mt-5 text-sm text-slate-400">
            Designed for daily property marketing, buyer communication, and listing improvement
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-400/18 bg-cyan-400/[0.09] p-6 shadow-[0_35px_100px_rgba(2,10,20,0.38)] sm:rounded-[34px] sm:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-100 sm:text-sm">What this replaces</div>
          <ul className="mt-6 space-y-4 text-base leading-8 text-slate-100 sm:space-y-5 sm:text-lg">
            <li>• Rewriting the same property description over and over</li>
            <li>• Guessing what to send after a buyer inquiry or showing</li>
            <li>• Scrambling to write cleaner ad copy at the last minute</li>
            <li>• Leaving older listings live without improving the messaging</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 xl:grid-cols-4">
        <FeatureCard
          title="MLS Listing Writer"
          description="Turn property facts into a clear public-facing description with better structure and cleaner positioning."
        />
        <FeatureCard
          title="Buyer Follow-Up"
          description="Create stronger after-inquiry and after-showing messages that sound useful, not robotic."
        />
        <FeatureCard
          title="Property Ad Copy"
          description="Generate social ad headlines, primary text, and CTA ideas for new listings and promotions."
        />
        <FeatureCard
          title="Listing Rewrite Studio"
          description="Paste an older listing and rewrite it for a stronger angle, cleaner tone, or shorter format."
        />
      </section>
    </PageShell>
  );
}
