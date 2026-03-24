"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";
import Paywall from "@/components/paywall";

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
        <Paywall
          title="Unlock buyer follow-up sequences"
          description="Starter gives you after-inquiry, after-showing, and closing-style follow-up messages so you can keep warm buyers moving."
          buttonText="Unlock Starter"
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="max-w-5xl">
        <SectionBadge>Starter tool</SectionBadge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl">
          Buyer Follow-Up Sequences
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-300 sm:mt-5 sm:text-lg md:text-xl md:leading-9">
          Create cleaner follow-up messages after a showing, new inquiry, or warm buyer conversation.
        </p>
      </div>

      <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 xl:grid-cols-[1fr,1fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_90px_rgba(2,10,20,0.35)] sm:rounded-[34px] sm:p-7">
          <label className="mb-3 block text-base font-medium text-slate-200 sm:text-lg">Lead context</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: Couple viewed a townhouse on Sunday, liked the location, asked about HOA, and said they need to compare with one other home this week..."
            className="min-h-[260px] w-full rounded-2xl border border-white/10 bg-[#05101d] px-4 py-4 text-base text-white outline-none placeholder:text-slate-500 sm:min-h-[300px] sm:px-5 sm:text-lg"
          />
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="w-full rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading ? "Generating..." : "Generate follow-up"}
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_90px_rgba(2,10,20,0.35)] sm:rounded-[34px] sm:p-7">
          {!output ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-[#05101d]/70 px-4 text-center text-base leading-8 text-slate-400 sm:min-h-[380px] sm:rounded-[28px] sm:text-lg">
              Your follow-up output will appear here.
            </div>
          ) : (
            <>
              <pre className="whitespace-pre-wrap rounded-[24px] border border-white/10 bg-[#05101d]/75 p-5 text-base leading-8 text-slate-200 sm:rounded-[28px] sm:p-6 sm:text-lg">
{output}
              </pre>
              <div className="mt-5 rounded-[24px] border border-cyan-400/20 bg-cyan-400/[0.06] p-5">
                <div className="text-sm font-semibold text-white">Why this works</div>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-200">
                  <li>• Gives you more than one tone for the same buyer situation</li>
                  <li>• Helps you respond quickly without sounding canned</li>
                  <li>• Keeps the next step visible instead of ending cold</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}
