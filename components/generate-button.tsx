"use client";

type Props = {
  loading: boolean;
  label?: string;
};

export function GenerateButton({ loading, label = "Generate" }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Generating..." : label}
    </button>
  );
}
