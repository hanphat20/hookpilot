"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import { GenerateButton } from "@/components/generate-button";

export default function ListingToolPage() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai/listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setOutput(data?.text || "No result returned.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    alert("Copied.");
  }

  return (
    <PageShell>
      <div className="max-w-5xl">
        <SectionBadge>Listing tool</SectionBadge>
        <h1 className="mt-6 text-6xl font-semibold tracking-tight text-white">Real Estate Listing Generator</h1>
        <p className="mt-5 text-xl leading-9 text-slate-300">
          Paste property details and generate a cleaner real estate listing description with a more polished presentation.
        </p>
      </div>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1fr,1fr]">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
          <label className="mb-3 block text-lg font-medium text-slate-200">Property details</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: 3-bedroom townhouse in Austin, 2 baths, open kitchen, private patio, close to schools and shopping..."
            className="min-h-[300px] w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
          />
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !text.trim()}
              className="rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate listing"}
            </button>
          </div>
        </div>

        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
          {!output ? (
            <div className="flex min-h-[380px] items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-[#05101d]/70 text-center text-lg leading-8 text-slate-400">
              Your generated listing will appear here.
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold text-white">Generated listing</h2>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-base font-medium text-white transition hover:bg-white/10"
                >
                  Copy
                </button>
              </div>
              <pre className="mt-5 whitespace-pre-wrap rounded-[28px] border border-white/10 bg-[#05101d]/75 p-6 text-lg leading-8 text-slate-200">
{output}
              </pre>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
