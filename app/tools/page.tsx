import Link from "next/link";
import { ToolCard } from "@/components/tool-card";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30%),linear-gradient(180deg,#071120_0%,#091428_45%,#0b1322_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
              Tool Suite
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Full tools</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Bộ công cụ dùng ngay để tạo hook, caption, video script và landing page copy. Tất cả đều có giao diện sạch và dễ bán hơn bản demo cũ.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
          >
            Back to dashboard
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ToolCard
            href="/tools/content"
            title="AI Content Generator"
            badge="Starter"
            description="Tạo hook, caption, CTA và video script từ keyword, platform và mục tiêu chiến dịch."
          />
          <ToolCard
            href="/tools/hooks"
            title="Viral Hook Generator"
            badge="Free"
            description="Sinh ra nhiều câu mở đầu đánh mạnh vào cảm xúc, lợi ích hoặc nỗi đau theo từng ngách."
          />
          <ToolCard
            href="/tools/landing"
            title="Landing Page Generator"
            badge="Pro"
            description="Tạo khung nội dung landing page theo offer, brand và CTA để đưa sang code nhanh hơn."
          />
        </div>
      </div>
    </main>
  );
}
