import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_28%),linear-gradient(180deg,#071120_0%,#091428_42%,#0b1322_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <section className="grid items-center gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
              HookPilot for sellers
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight">
              Create TikTok selling scripts, product captions, and landing copy faster
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Built for online sellers, small teams, and creators who need faster content output without messy workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/tools"
                className="rounded-2xl bg-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Try the tools
              </Link>
              <Link
                href="/pricing"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-medium text-white transition hover:bg-white/10"
              >
                View pricing
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/20">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-400">What you get</div>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
              <li>• TikTok script generation for product selling videos</li>
              <li>• Product captions and CTA ideas for daily posting</li>
              <li>• Landing page copy for simple offer pages</li>
              <li>• Upgrade path with auto-renew and card management</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
