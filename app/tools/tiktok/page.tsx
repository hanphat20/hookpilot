"use client";

import { useState } from "react";
import { BackHomeLink } from "@/components/back-home-link";

export default function TikTokToolPage() {
  const [product, setProduct] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);

    try {
      const res = await fetch("/api/ai/tiktok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
      });

      const data = await res.json();
      setOutput(data.text || data.error || "No result returned.");
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    alert("Copied.");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(180deg,#071120_0%,#091428_40%,#0b1322_100%)] text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6">
          <BackHomeLink />
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
              Core tool
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">TikTok Script Generator</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Enter your product and generate a stronger script structure for short selling videos.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[420px,1fr]">
            <section className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-5">
              <label className="mb-2 block text-sm font-medium text-slate-200">Product</label>
              <input
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Example: Glow Serum"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={generate}
                disabled={loading || !product}
                className="mt-4 w-full rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Generating..." : "Generate script"}
              </button>
            </section>

            <section className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-5">
              {!output ? (
                <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-black/20 text-center text-sm leading-7 text-slate-400">
                  Your generated script will appear here.
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold">Generated result</h2>
                    <button
                      type="button"
                      onClick={copyResult}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-3xl border border-white/10 bg-black/30 p-5 text-sm leading-7 text-slate-100">
{output}
                  </pre>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
