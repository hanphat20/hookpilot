"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CustomerAuthButtons() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("user_email") || "");
  }, []);

  function signOut() {
    localStorage.removeItem("user_email");
    localStorage.removeItem("customer_plan");
    localStorage.removeItem("stripe_customer_id");
    window.location.href = "/";
  }

  if (!email) {
    return (
      <Link
        href="/login"
        className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="max-w-[220px] truncate text-sm text-slate-300">{email}</span>
      <button
        type="button"
        onClick={signOut}
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
      >
        Sign out
      </button>
    </div>
  );
}
