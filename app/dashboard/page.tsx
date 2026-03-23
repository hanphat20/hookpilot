import Link from "next/link";
import type { Plan } from "@/lib/plans";
import { PLAN_LABELS, canUseProFeatures, canUseStarterFeatures } from "@/lib/plans";
import { OpenToolsButton } from "@/components/open-tools-button";

export default function DashboardPage() {
  const currentPlan: Plan = "free";
  const starterUnlocked = canUseStarterFeatures(currentPlan);
  const proUnlocked = canUseProFeatures(currentPlan);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(180deg,#071120_0%,#091428_40%,#0b1322_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-cyan-950/20">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
                HookPilot Control Center
              </div>
              <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                Manage your plan, open content tools quickly, and control feature access from one clean workspace.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Current plan</div>
                  <div className="mt-1 text-lg font-semibold">{PLAN_LABELS[currentPlan]}</div>
                </div>

                <Link
                  href="/pricing"
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                >
                  Upgrade plan
                </Link>

                <OpenToolsButton />
              </div>
            </div>

            <div className="grid w-full max-w-md grid-cols-2 gap-3">
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <div className="text-sm text-slate-400">Tool suite</div>
                <div className="mt-2 text-2xl font-semibold">3 tools</div>
                <div className="mt-2 text-sm text-slate-300">Hooks, content, landing copy</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <div className="text-sm text-slate-400">Status</div>
                <div className="mt-2 text-2xl font-semibold">Ready</div>
                <div className="mt-2 text-sm text-slate-300">You can start now</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Account</div>
            <h2 className="mt-3 text-xl font-semibold">Workspace overview</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Track your current plan and upgrade anytime when you need more exports or higher usage limits.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Plan in use</span>
                <span className="font-semibold text-white">{PLAN_LABELS[currentPlan]}</span>
              </div>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Starter</div>
            <h2 className="mt-3 text-xl font-semibold">Starter features</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Unlock core exports, faster caption workflows, and higher usage capacity for everyday work.
            </p>
            <div className="mt-6">
              {starterUnlocked ? (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200">
                  Unlocked
                </span>
              ) : (
                <Link
                  href="/pricing"
                  className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-sm font-medium text-amber-100"
                >
                  Upgrade to Starter
                </Link>
              )}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Pro</div>
            <h2 className="mt-3 text-xl font-semibold">Pro features</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Unlock advanced landing copy generation, fuller exports, and more power for real campaigns.
            </p>
            <div className="mt-6">
              {proUnlocked ? (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200">
                  Unlocked
                </span>
              ) : (
                <Link
                  href="/pricing"
                  className="rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1 text-sm font-medium text-rose-100"
                >
                  Upgrade to Pro
                </Link>
              )}
            </div>
          </article>
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Quick access</div>
              <h2 className="mt-2 text-2xl font-semibold">Go straight into the tool suite</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Open the full set of hook, content, and landing page tools from here without landing on empty screens.
              </p>
            </div>

            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Open full tool suite
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
