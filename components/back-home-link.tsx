import Link from "next/link";

export function BackHomeLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
    >
      ← Back to home
    </Link>
  );
}
