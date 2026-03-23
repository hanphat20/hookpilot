"use client";

import { useState } from "react";
import { GenerateButton } from "@/components/generate-button";
import { PageShell } from "@/components/page-shell";
import { SectionBadge } from "@/components/section-badge";

type ContentResult = {
  hooks: string[];
  caption: string;
  script: string;
  ctas: string[];
};

export default function ContentToolPage() {
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [goal, setGoal] = useState("Lead generation");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ContentResult | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/tools/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword, platform, goal }),
      });

      const data = (await res.json()) as ContentResult;
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <div className="max-w-5xl">
        <SectionBadge>Starter tool</SectionBadge>
        <h1 className="mt-6 text-6xl font-semibold tracking-tight text-white">AI Content Generator</h1>
        <p className="mt-5 text-xl leading-9 text-slate-300">
          Enter a keyword, platform, and goal to generate hooks, captions, CTA lines, and a simple video script.
        </p>
      </div>

      <section className="mt-10 rounded-[34px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
        <form className="space-y-7" onSubmit={handleSubmit}>
          <div>
            <label className="mb-3 block text-lg font-medium text-slate-200">Keyword</label>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Example: AI content tool for real estate"
              className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none placeholder:text-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-3 block text-lg font-medium text-slate-200">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none"
            >
              <option>TikTok</option>
              <option>Facebook</option>
              <option>SEO Blog</option>
              <option>YouTube Shorts</option>
            </select>
          </div>

          <div>
            <label className="mb-3 block text-lg font-medium text-slate-200">Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#05101d] px-5 py-4 text-lg text-white outline-none"
            >
              <option>Lead generation</option>
              <option>Sales conversion</option>
              <option>Brand awareness</option>
              <option>Retargeting</option>
            </select>
          </div>

          <GenerateButton loading={loading} label="Generate content" />
        </form>
      </section>

      <section className="mt-10 rounded-[34px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_90px_rgba(2,10,20,0.35)]">
        {!result ? (
          <div className="flex min-h-[360px] items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-[#05101d]/70 text-center text-lg leading-8 text-slate-400">
            Your generated result will appear here.
          </div>
        ) : (
          <div className="space-y-7">
            <div className="rounded-[28px] border border-white/10 bg-[#05101d]/75 p-6">
              <h2 className="text-2xl font-semibold text-white">Hook ideas</h2>
              <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-200">
                {result.hooks.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#05101d]/75 p-6">
              <h2 className="text-2xl font-semibold text-white">Caption</h2>
              <p className="mt-4 whitespace-pre-wrap text-lg leading-8 text-slate-200">{result.caption}</p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#05101d]/75 p-6">
              <h2 className="text-2xl font-semibold text-white">Video script</h2>
              <p className="mt-4 whitespace-pre-wrap text-lg leading-8 text-slate-200">{result.script}</p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#05101d]/75 p-6">
              <h2 className="text-2xl font-semibold text-white">CTA lines</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {result.ctas.map((cta) => (
                  <span
                    key={cta}
                    className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-base text-cyan-100"
                  >
                    {cta}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </PageShell>
  );
}
