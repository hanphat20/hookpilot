type Props = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  accent?: boolean;
};

export function InfoPanel({ eyebrow, title, description, children, accent }: Props) {
  return (
    <section
      className={[
        "rounded-[32px] border p-8 shadow-[0_30px_90px_rgba(2,10,20,0.35)]",
        accent
          ? "border-cyan-400/25 bg-cyan-400/[0.09]"
          : "border-white/10 bg-white/[0.04]",
      ].join(" ")}
    >
      <div className="text-sm uppercase tracking-[0.22em] text-slate-300">{eyebrow}</div>
      <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}
