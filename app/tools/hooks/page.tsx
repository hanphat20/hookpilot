"use client";

import { useState } from "react";
import { GenerateButton } from "@/components/generate-button";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";

export default function HooksToolPage() {
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Bold");
  const [loading, setLoading] = useState(false);
  const [hooks, setHooks] = useState<string[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/tools/hooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ niche, audience, tone }),
      });

      const data = (await res.json()) as { hooks: string[] };
      setHooks(data.hooks);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <div className="max-w-5xl">
        <SectionBadge>Free tool</SectionBadge>
        <h1 className="mt-6 text-6xl font-semibold tracking-tight text-white">Viral Hook Generator</h1>
        <p className="mt-5 text-xl leading-9 text-slate-300">
          Create stronger opening lines for ads, posts, and short videos based on a niche, audience, and tone.
        </p>
      </div>

      <section className="mt-10 grid gap-6 xl:grid-cols-[420px,1fr]">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-3 block text-lg font-medium text-slate-200">Niche</label>
              <input
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Example: marketing software"
                className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
                required
              />
            </div>

            <div>
              <label className="mb-3 block text-lg font-medium text-slate-200">Audience</label>
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="Example: online shop owners"
                className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
                required
              />
            </div>

            <div>
              <label className="mb-3 block text-lg font-medium text-slate-200">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none"
              >
                <option>Bold</option>
                <option>Urgent</option>
                <option>Premium</option>
                <option>Friendly</option>
              </select>
            </div>

            <GenerateButton loading={loading} label="Generate hooks" />
          </form>
        </div>

        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
          {hooks.length === 0 ? (
            <div className="flex min-h-[420px] items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-[#05101d]/70 text-center text-lg leading-8 text-slate-400">
              Your generated hooks will appear here.
            </div>
          ) : (
            <div className="grid gap-4">
              {hooks.map((hook, index) => (
                <div key={hook} className="rounded-[28px] border border-white/10 bg-[#05101d]/75 p-6">
                  <div className="text-sm uppercase tracking-[0.22em] text-slate-400">Hook {index + 1}</div>
                  <p className="mt-4 text-lg leading-8 text-slate-200">{hook}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
