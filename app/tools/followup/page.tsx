'use client';
import { useState } from "react";
export default function FollowUpTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  async function generate() {
    const res = await fetch("/api/generate/followup", {
      method: "POST",
      body: JSON.stringify({ input })
    });
    const data = await res.json();
    setResult(data.text);
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl text-white mb-4">Buyer Follow-Up Generator</h1>
      <textarea className="w-full p-4 bg-[#06101d] text-white"
        placeholder="Describe situation"
        onChange={(e) => setInput(e.target.value)} />
      <button onClick={generate} className="mt-4 bg-cyan-400 px-6 py-3 rounded-xl">
        Generate
      </button>
      <pre className="mt-6 text-white whitespace-pre-wrap">{result}</pre>
    </div>
  );
}
