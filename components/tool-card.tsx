import Link from "next/link";

type Props = {
  href: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
};

export function ToolCard({ href, title, subtitle, description, badge }: Props) {
  return (
    <Link
      href={href}
      className="group rounded-[30px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_25px_80px_rgba(1,8,20,0.35)] transition hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-white/[0.05]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-semibold leading-tight text-white">{title}</div>
          <div className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-400">{subtitle}</div>
        </div>

        <span className="rounded-full border border-cyan-400/35 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-200">
          {badge}
        </span>
      </div>

      <p className="mt-6 text-lg leading-8 text-slate-300">{description}</p>
      <div className="mt-8 text-lg font-medium text-cyan-300">Open tool →</div>
    </Link>
  );
}
