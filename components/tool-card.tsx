import Link from "next/link";

type ToolCardProps = {
  href: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
};

export function ToolCard({ href, title, subtitle, description, badge }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.06]"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{subtitle}</div>
        </div>
        {badge ? (
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
            {badge}
          </span>
        ) : null}
      </div>
      <p className="text-sm leading-6 text-slate-300">{description}</p>
      <div className="mt-6 text-sm font-medium text-cyan-300">Open tool →</div>
    </Link>
  );
}
