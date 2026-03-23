"use client";
import { useState } from "react";

export default function TikTokTool() {
  const [product, setProduct] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/ai/tiktok", {
      method: "POST",
      body: JSON.stringify({ product }),
    });
    const data = await res.json();
    setOutput(data.text || data.error);
    setLoading(false);
  }

  function copy() {
    navigator.clipboard.writeText(output);
    alert("Copied!");
  }

  return (
    <div className="p-10 text-white max-w-3xl mx-auto">
      <h1 className="text-3xl mb-6">TikTok Script Generator</h1>

      <input
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Enter your product..."
        className="p-3 text-black w-full mb-4 rounded"
      />

      <button onClick={generate} className="bg-cyan-400 px-4 py-2 text-black rounded">
        {loading ? "Generating..." : "Generate"}
      </button>

      {output && (
        <>
          <pre className="mt-6 whitespace-pre-wrap bg-black p-4 rounded">{output}</pre>
          <button onClick={copy} className="mt-3 bg-white text-black px-3 py-2 rounded">
            Copy
          </button>
        </>
      )}
    </div>
  );
}
