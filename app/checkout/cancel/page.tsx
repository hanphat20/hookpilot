import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";

export default function CheckoutCancelPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl rounded-[34px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
        <SectionBadge>Checkout cancelled</SectionBadge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white">Your upgrade was not completed</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          You can return to pricing any time and continue when you are ready.
        </p>
        <Link
          href="/pricing"
          className="mt-8 inline-flex rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Back to pricing
        </Link>
      </div>
    </PageShell>
  );
}
