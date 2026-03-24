import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { FeatureCard } from "@/components/feature-card";

export default function HomePage() {
  return (
    <PageShell>
      <section className="grid items-center gap-8 lg:grid-cols-[1.12fr,0.88fr] lg:gap-10">
        <div>
          <SectionBadge>For real estate professionals</SectionBadge>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Write better property listings and follow-ups in minutes
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg lg:text-xl lg:leading-9">
            Create polished listing descriptions, buyer follow-up messages, and property ads that help you present every property more professionally.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/tools/listing"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Try the listing tool
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10"
            >
              View plans
            </Link>
          </div>

          <div className="mt-5 text-sm text-slate-400">
            Built for agents, brokers, and small property teams
          </div>
        </div>

        <div className="rounded-[28px] border border-cyan-400/18 bg-cyan-400/[0.09] p-6 shadow-[0_35px_100px_rgba(2,10,20,0.38)] sm:rounded-[34px] sm:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-cyan-100 sm:text-sm">What you can do</div>
          <ul className="mt-6 space-y-4 text-base leading-8 text-slate-100 sm:space-y-5 sm:text-lg">
            <li>• Turn raw property details into polished listing copy</li>
            <li>• Write follow-up messages after viewings or new inquiries</li>
            <li>• Generate cleaner ad copy for property campaigns</li>
            <li>• Save time without sacrificing presentation quality</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 xl:grid-cols-3">
        <FeatureCard
          title="Listing descriptions"
          description="Transform basic property notes into clear, persuasive descriptions ready for your website, portal listing, or brochure."
        />
        <FeatureCard
          title="Buyer follow-ups"
          description="Generate natural follow-up messages that keep interested buyers engaged after an inquiry or showing."
        />
        <FeatureCard
          title="Property ads"
          description="Create stronger ad copy for social campaigns and property promotions without rewriting the same message every time."
        />
      </section>
    </PageShell>
  );
}
