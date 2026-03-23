import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08111f]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <BrandMark />
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-slate-300 transition hover:text-white">
            Home
          </Link>
          <Link href="/dashboard" className="text-sm text-slate-300 transition hover:text-white">
            Dashboard
          </Link>
          <Link href="/tools" className="text-sm text-slate-300 transition hover:text-white">
            Tools
          </Link>
          <Link href="/pricing" className="text-sm text-slate-300 transition hover:text-white">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Home
          </Link>
          <Link
            href="/tools"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Open Tools
          </Link>
          <Link
            href="/pricing"
            className="rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Upgrade
          </Link>
        </div>
      </div>
    </header>
  );
}
