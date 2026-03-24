"use client";

type Props = {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
};

export default function Paywall({
  title = "Unlock follow-up and closing scripts",
  description = "Turn more leads into real deals with stronger follow-up messages, ad copy, and listing improvements.",
  buttonText = "Unlock full workflow",
  href = "/pricing",
}: Props) {
  return (
    <div className="rounded-[28px] border border-cyan-400/25 bg-cyan-400/[0.08] p-6 shadow-[0_25px_80px_rgba(1,8,20,0.35)] sm:p-8">
      <div className="text-xs uppercase tracking-[0.22em] text-cyan-100">Upgrade required</div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
        {description}
      </p>
      <a
        href={href}
        className="mt-6 inline-flex rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
      >
        {buttonText}
      </a>
    </div>
  );
}
