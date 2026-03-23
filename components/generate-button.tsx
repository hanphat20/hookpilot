"use client";

type Props = {
  loading: boolean;
  label?: string;
};

export function GenerateButton({ loading, label = "Generate content" }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Generating..." : label}
    </button>
  );
}
