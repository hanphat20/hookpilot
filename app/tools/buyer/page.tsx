"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";

export default function BuyerToolPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    setPlan(localStorage.getItem("customer_plan") || "free");
  }, []);

  async function handleGenerate() {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai/buyer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setOutput(data?.text || "No result returned.");
    } finally {
      setLoading(false);
    }
  }

  if (plan === "free") {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl rounded-[34px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
          <SectionBadge>Starter required</SectionBadge>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white">Upgrade to unlock Buyer Follow-up Generator</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            This tool is available on Starter and Pro plans.
          </p>
          <a
            href="/pricing"
            className="mt-8 inline-flex rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Upgrade now
          </a>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="max-w-5xl">
        <SectionBadge>Starter tool</SectionBadge>
        <h1 className="mt-6 text-6xl font-semibold tracking-tight text-white">Buyer Follow-up Generator</h1>
        <p className="mt-5 text-xl leading-9 text-slate-300">
          Create stronger follow-up messages after a showing, new inquiry, or warm lead conversation.
        </p>
      </div>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1fr,1fr]">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
          <label className="mb-3 block text-lg font-medium text-slate-200">Lead context</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: Buyer viewed a 2-bedroom condo on Saturday, liked the location, asked about HOA, and said they need to decide this week..."
            className="min-h-[300px] w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
          />
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate follow-up"}
            </button>
          </div>
        </div>

        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
          {!output ? (
            <div className="flex min-h-[380px] items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-[#05101d]/70 text-center text-lg leading-8 text-slate-400">
              Your buyer follow-up script will appear here.
            </div>
          ) : (
            <pre className="whitespace-pre-wrap rounded-[28px] border border-white/10 bg-[#05101d]/75 p-6 text-lg leading-8 text-slate-200">
{output}
            </pre>
          )}
        </div>
      </section>
    </PageShell>
  );
}
