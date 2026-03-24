'use client';
export default function Paywall({ onUpgrade }: any) {
  return (
    <div className="p-6 bg-[#06101d] border border-cyan-400/20 rounded-2xl">
      <h2 className="text-xl font-semibold text-white">
        Unlock follow-up and closing scripts
      </h2>
      <p className="text-slate-300 mt-2">
        Turn more leads into real deals.
      </p>
      <button onClick={onUpgrade} className="mt-4 w-full bg-cyan-400 text-black py-3 rounded-xl font-semibold">
        Unlock full workflow
      </button>
    </div>
  );
}
