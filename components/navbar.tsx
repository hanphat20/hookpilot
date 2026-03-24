"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { CustomerAuthButtons } from "@/components/customer-auth-buttons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tools", label: "Tools" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <BrandMark />

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[15px] font-medium text-slate-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/pricing"
              className="rounded-2xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Upgrade
            </Link>
            <CustomerAuthButtons />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {open ? (
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Upgrade now
              </Link>

              <div className="mt-2">
                <CustomerAuthButtons />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
