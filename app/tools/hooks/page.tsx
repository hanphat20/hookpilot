"use client";

import { useState } from "react";
import { GenerateButton } from "@/components/generate-button";

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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30%),linear-gradient(180deg,#071120_0%,#091428_45%,#0b1322_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
            Free tool
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Viral Hook Generator</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Tạo hàng loạt câu mở đầu cho video, post hoặc quảng cáo theo ngách, đối tượng và tone.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px,1fr]">
          <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Niche</label>
                <input
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="Ví dụ: phần mềm marketing"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Audience</label>
                <input
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="Ví dụ: chủ shop online"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none"
                >
                  <option>Bold</option>
                  <option>Urgent</option>
                  <option>Premium</option>
                  <option>Friendly</option>
                </select>
              </div>

              <GenerateButton loading={loading} label="Generate hooks" />
            </form>
          </section>

          <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            {hooks.length === 0 ? (
              <div className="flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-950/30 text-center text-sm leading-6 text-slate-400">
                Nhập dữ liệu rồi bấm Generate để lấy danh sách hooks.
              </div>
            ) : (
              <div className="grid gap-4">
                {hooks.map((hook, index) => (
                  <div
                    key={hook}
                    className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
                  >
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Hook {index + 1}</div>
                    <p className="mt-3 text-sm leading-7 text-slate-200">{hook}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
