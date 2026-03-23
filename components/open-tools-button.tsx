"use client";

import { useRouter } from "next/navigation";

export function OpenToolsButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/tools")}
      className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
    >
      Open Tools
    </button>
  );
}
