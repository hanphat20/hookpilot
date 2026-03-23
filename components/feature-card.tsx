type Props = {
  title: string;
  description: string;
};

export function FeatureCard({ title, description }: Props) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_25px_80px_rgba(1,8,20,0.35)]">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-base leading-8 text-slate-300">{description}</p>
    </div>
  );
}
