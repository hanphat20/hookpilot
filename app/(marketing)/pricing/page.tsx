import Link from "next/link";
import { auth } from "@/auth";
import { CheckoutButton } from "@/components/checkout-button";

const starterPriceId = process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "";
const proPriceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "";

export default async function PricingPage() {
  const session = await auth();
  const email = session?.user?.email ?? null;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          HookPilot Pricing
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
          Chọn gói phù hợp để bắt đầu kiếm tiền
        </h1>
        <p className="mt-4 text-base text-gray-600">
          Gói Free để trải nghiệm. Starter cho người mới bán hàng. Pro dành cho team chạy thật.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="mt-2 text-3xl font-bold">0đ</p>
          <ul className="mt-6 space-y-3 text-sm text-gray-600">
            <li>1 workspace</li>
            <li>Giới hạn tính năng cơ bản</li>
            <li>Không có export nâng cao</li>
          </ul>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900"
          >
            Dùng gói Free
          </Link>
        </section>

        <section className="rounded-2xl border-2 border-black bg-white p-6 shadow-sm">
          <div className="mb-4 inline-flex rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
            Phổ biến nhất
          </div>
          <h2 className="text-xl font-semibold">Starter</h2>
          <p className="mt-2 text-3xl font-bold">$19</p>
          <ul className="mt-6 space-y-3 text-sm text-gray-600">
            <li>5 workspace</li>
            <li>Export cơ bản</li>
            <li>Thanh toán Stripe</li>
          </ul>
          <div className="mt-8">
            <CheckoutButton priceId={starterPriceId} planName="Starter" userEmail={email} />
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Pro</h2>
          <p className="mt-2 text-3xl font-bold">$49</p>
          <ul className="mt-6 space-y-3 text-sm text-gray-600">
            <li>Workspace không giới hạn</li>
            <li>Export đầy đủ</li>
            <li>Ưu tiên tính năng nâng cao</li>
          </ul>
          <div className="mt-8">
            <CheckoutButton priceId={proPriceId} planName="Pro" userEmail={email} />
          </div>
        </section>
      </div>
    </main>
  );
}
