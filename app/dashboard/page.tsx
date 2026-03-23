import Link from "next/link";
import type { Plan } from "@/lib/plans";
import { PLAN_LABELS, canUseProFeatures, canUseStarterFeatures } from "@/lib/plans";
import { OpenToolsButton } from "@/components/open-tools-button";

export default function DashboardPage() {
  const currentPlan: Plan = "free";
  const starterUnlocked = canUseStarterFeatures(currentPlan);
  const proUnlocked = canUseProFeatures(currentPlan);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(180deg,#071120_0%,#091428_40%,#0b1322_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-cyan-950/20">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
                Trung tâm điều khiển HookPilot
              </div>
              <h1 className="text-4xl font-semibold tracking-tight">Bảng điều khiển</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                Quản lý gói dịch vụ, truy cập nhanh các công cụ tạo nội dung và landing page,
                đồng thời theo dõi quyền sử dụng theo từng gói.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Gói hiện tại</div>
                  <div className="mt-1 text-lg font-semibold">{PLAN_LABELS[currentPlan]}</div>
                </div>

                <Link
                  href="/pricing"
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                >
                  Nâng cấp gói
                </Link>

                <OpenToolsButton />
              </div>
            </div>

            <div className="grid w-full max-w-md grid-cols-2 gap-3">
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <div className="text-sm text-slate-400">Công cụ</div>
                <div className="mt-2 text-2xl font-semibold">3 mục</div>
                <div className="mt-2 text-sm text-slate-300">Hook, nội dung, landing page</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <div className="text-sm text-slate-400">Trạng thái</div>
                <div className="mt-2 text-2xl font-semibold">Sẵn sàng</div>
                <div className="mt-2 text-sm text-slate-300">Có thể dùng ngay</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Tài khoản</div>
            <h2 className="mt-3 text-xl font-semibold">Quản lý tài khoản</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Theo dõi gói hiện tại và nâng cấp nhanh khi cần mở thêm tính năng hoặc giới hạn sử dụng.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Gói đang dùng</span>
                <span className="font-semibold text-white">{PLAN_LABELS[currentPlan]}</span>
              </div>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Starter</div>
            <h2 className="mt-3 text-xl font-semibold">Tính năng gói Starter</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Mở khóa xuất nội dung cơ bản, quy trình tạo caption nhanh và số lượt dùng cao hơn.
            </p>
            <div className="mt-6">
              {starterUnlocked ? (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200">
                  Đã mở khóa
                </span>
              ) : (
                <Link
                  href="/pricing"
                  className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-sm font-medium text-amber-100"
                >
                  Nâng cấp lên Starter
                </Link>
              )}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Pro</div>
            <h2 className="mt-3 text-xl font-semibold">Tính năng gói Pro</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Mở khóa tạo landing page nâng cao, xuất nội dung đầy đủ và hỗ trợ nhiều chiến dịch hơn.
            </p>
            <div className="mt-6">
              {proUnlocked ? (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200">
                  Đã mở khóa
                </span>
              ) : (
                <Link
                  href="/pricing"
                  className="rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1 text-sm font-medium text-rose-100"
                >
                  Nâng cấp lên Pro
                </Link>
              )}
            </div>
          </article>
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Truy cập nhanh</div>
              <h2 className="mt-2 text-2xl font-semibold">Đi thẳng vào bộ công cụ</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Từ đây bạn có thể mở bộ công cụ tạo hook, nội dung quảng cáo và khung landing page mà không cần qua màn hình trống.
              </p>
            </div>

            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Mở toàn bộ công cụ
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
