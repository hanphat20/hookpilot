import { auth } from "@/auth";
import { CheckoutButton } from "@/components/checkout-button";
import Link from "next/link";

const starterPriceId = process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "";
const proPriceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "";

export default async function PricingPage() {
  const session = await auth();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Pricing</h1>
        <p className="mt-4 text-neutral-600">
          Chốt luôn 3 gói rõ ràng để HookPilot bán được và scale được.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <section className="rounded-3xl border border-neutral-200 p-8">
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="mt-2 text-4xl font-bold">$0</p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-700">
            <li>1 project</li>
            <li>100 events / tháng</li>
            <li>Không export CSV</li>
            <li>Không AI automation</li>
          </ul>
          <Link href={session ? "/dashboard" : "/signin"} className="mt-8 inline-flex rounded-xl border border-neutral-300 px-5 py-3 text-sm font-semibold">
            Bắt đầu free
          </Link>
        </section>

        <section className="rounded-3xl border-2 border-black p-8 shadow-sm">
          <div className="mb-3 inline-block rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">Starter</div>
          <h2 className="text-xl font-semibold">Starter</h2>
          <p className="mt-2 text-4xl font-bold">$19</p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-700">
            <li>5 projects</li>
            <li>5,000 events / tháng</li>
            <li>CSV export</li>
            <li>3 team seats</li>
          </ul>
          <div className="mt-8">
            {session ? (
              <CheckoutButton priceId={starterPriceId}>Upgrade Starter</CheckoutButton>
            ) : (
              <Link href="/signin" className="inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white">
                Đăng nhập để nâng cấp
              </Link>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 p-8">
          <h2 className="text-xl font-semibold">Pro</h2>
          <p className="mt-2 text-4xl font-bold">$49</p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-700">
            <li>50 projects</li>
            <li>100,000 events / tháng</li>
            <li>CSV export</li>
            <li>AI automation</li>
          </ul>
          <div className="mt-8">
            {session ? (
              <CheckoutButton priceId={proPriceId}>Go Pro</CheckoutButton>
            ) : (
              <Link href="/signin" className="inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white">
                Đăng nhập để nâng cấp
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
