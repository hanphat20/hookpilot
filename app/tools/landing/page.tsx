"use client";

import { useState } from "react";
import { GenerateButton } from "@/components/generate-button";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";

type LandingResult = {
  headline: string;
  subheadline: string;
  bulletPoints: string[];
  cta: string;
  html: string;
};

export default function LandingToolPage() {
  const [brand, setBrand] = useState("");
  const [offer, setOffer] = useState("");
  const [cta, setCta] = useState("Start your free trial");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LandingResult | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/tools/landing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brand, offer, cta }),
      });

      const data = (await res.json()) as LandingResult;
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <div className="max-w-5xl">
        <SectionBadge>Pro tool</SectionBadge>
        <h1 className="mt-6 text-6xl font-semibold tracking-tight text-white">Landing Page Copy Generator</h1>
        <p className="mt-5 text-xl leading-9 text-slate-300">
          Build landing page messaging from your brand, offer, and CTA so you can move from idea to page faster.
        </p>
      </div>

      <section className="mt-10 grid gap-6 xl:grid-cols-[420px,1fr]">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-3 block text-lg font-medium text-slate-200">Brand name</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Example: HookPilot"
                className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
                required
              />
            </div>

            <div>
              <label className="mb-3 block text-lg font-medium text-slate-200">Offer or product</label>
              <textarea
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="Example: AI tool that creates sales content and landing copy for small businesses"
                className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
                required
              />
            </div>

            <div>
              <label className="mb-3 block text-lg font-medium text-slate-200">Primary CTA</label>
              <input
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none"
                required
              />
            </div>

            <GenerateButton loading={loading} label="Generate landing copy" />
          </form>
        </div>

        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
          {!result ? (
            <div className="flex min-h-[420px] items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-[#05101d]/70 text-center text-lg leading-8 text-slate-400">
              Your landing page copy will appear here.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-[#05101d]/75 p-6">
                <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Headline</div>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">{result.headline}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">{result.subheadline}</p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[#05101d]/75 p-6">
                <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Key selling points</div>
                <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-200">
                  {result.bulletPoints.map((item) => (
                    <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[#05101d]/75 p-6">
                <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Primary CTA</div>
                <div className="mt-4 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-base font-medium text-cyan-100">
                  {result.cta}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[#05101d]/75 p-6">
                <div className="text-sm uppercase tracking-[0.22em] text-slate-400">HTML block</div>
                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap text-base leading-7 text-slate-200">
{result.html}
                </pre>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
