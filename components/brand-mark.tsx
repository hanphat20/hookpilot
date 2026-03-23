import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-sm font-black text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.28)]">
        HP
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold tracking-[0.26em] text-white">HOOKPILOT</span>
        <span className="text-sm text-slate-400">AI Content &amp; Landing Tools</span>
      </span>
    </Link>
  );
}
