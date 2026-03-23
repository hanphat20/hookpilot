import Link from "next/link";
import { ToolCard } from "@/components/tool-card";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30%),linear-gradient(180deg,#071120_0%,#091428_45%,#0b1322_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
              Bộ công cụ
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Công cụ làm việc</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Bộ công cụ dùng ngay để tạo hook, nội dung bán hàng, video script và khung landing page.
              Giao diện đã được Việt hóa rõ ràng hơn để dễ dùng và dễ bán.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
          >
            Quay lại bảng điều khiển
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ToolCard
            href="/tools/content"
            title="Tạo nội dung bằng AI"
            badge="Starter"
            description="Tạo hook, caption, lời kêu gọi hành động và kịch bản video từ từ khóa, nền tảng và mục tiêu chiến dịch."
          />
          <ToolCard
            href="/tools/hooks"
            title="Tạo hook viral"
            badge="Miễn phí"
            description="Sinh nhiều câu mở đầu đánh vào cảm xúc, nỗi đau hoặc lợi ích theo từng ngách cụ thể."
          />
          <ToolCard
            href="/tools/landing"
            title="Tạo nội dung landing page"
            badge="Pro"
            description="Tạo khung nội dung landing page theo thương hiệu, ưu đãi và lời kêu gọi hành động để đưa sang code nhanh hơn."
          />
        </div>
      </div>
    </main>
  );
}
