type Props = {
  children: React.ReactNode;
};

export function SectionBadge({ children }: Props) {
  return (
    <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-200">
      {children}
    </div>
  );
}
