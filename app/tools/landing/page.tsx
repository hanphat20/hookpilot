"use client";

import { useState } from "react";
import { GenerateButton } from "@/components/generate-button";

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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30%),linear-gradient(180deg,#071120_0%,#091428_45%,#0b1322_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
            Pro tool
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Landing Page Copy Generator</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Build landing page messaging from your brand, offer, and CTA so you can move from idea to page faster.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px,1fr]">
          <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Brand name</label>
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Example: HookPilot"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Offer or product</label>
                <textarea
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  placeholder="Example: AI tool that creates sales content and landing copy for small businesses"
                  className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Primary CTA</label>
                <input
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                  required
                />
              </div>

              <GenerateButton loading={loading} label="Generate landing copy" />
            </form>
          </section>

          <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            {!result ? (
              <div className="flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-950/30 text-center text-sm leading-6 text-slate-400">
                Your landing page copy will appear here after generation.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Headline</div>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight">{result.headline}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{result.subheadline}</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Key selling points</div>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-200">
                    {result.bulletPoints.map((item) => (
                      <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Primary CTA</div>
                  <div className="mt-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-100">
                    {result.cta}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">HTML block</div>
                  <pre className="mt-4 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-slate-200">
{result.html}
                  </pre>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
