"use client";

import { useState } from "react";
import { GenerateButton } from "@/components/generate-button";

type ContentResult = {
  hooks: string[];
  caption: string;
  script: string;
  ctas: string[];
};

export default function ContentToolPage() {
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [goal, setGoal] = useState("Tạo khách hàng tiềm năng");
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30%),linear-gradient(180deg,#071120_0%,#091428_45%,#0b1322_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
            Công cụ gói Starter
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Tạo nội dung bằng AI</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Nhập từ khóa, nền tảng và mục tiêu để tạo nhanh câu mở đầu, caption, lời kêu gọi hành động và kịch bản video.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px,1fr]">
          <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Từ khóa</label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Ví dụ: phần mềm tạo nội dung cho bất động sản"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Nền tảng</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none"
                >
                  <option>TikTok</option>
                  <option>Facebook</option>
                  <option>SEO Blog</option>
                  <option>YouTube Shorts</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Mục tiêu</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none"
                >
                  <option>Tạo khách hàng tiềm năng</option>
                  <option>Tăng chuyển đổi bán hàng</option>
                  <option>Tăng nhận diện thương hiệu</option>
                  <option>Chạy lại khách hàng cũ</option>
                </select>
              </div>

              <GenerateButton loading={loading} label="Tạo nội dung" />
            </form>
          </section>

          <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            {!result ? (
              <div className="flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-950/30 text-center text-sm leading-6 text-slate-400">
                Kết quả sẽ hiển thị ở đây sau khi bạn bấm nút tạo nội dung.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                  <h2 className="text-lg font-semibold">Câu mở đầu gợi ý</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                    {result.hooks.map((item) => (
                      <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                  <h2 className="text-lg font-semibold">Caption</h2>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-200">{result.caption}</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                  <h2 className="text-lg font-semibold">Kịch bản video</h2>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-200">{result.script}</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                  <h2 className="text-lg font-semibold">Lời kêu gọi hành động</h2>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {result.ctas.map((cta) => (
                      <span
                        key={cta}
                        className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100"
                      >
                        {cta}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
