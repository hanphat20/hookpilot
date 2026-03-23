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
    setOutput(data.text);
    setLoading(false);
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl mb-6">TikTok Script Generator (PRO)</h1>

      <input
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Nhập sản phẩm..."
        className="p-3 text-black w-full mb-4"
      />

      <button onClick={generate} className="bg-cyan-400 px-4 py-2 text-black">
        {loading ? "Đang tạo..." : "Generate"}
      </button>

      <pre className="mt-6 whitespace-pre-wrap">{output}</pre>
    </div>
  );
}
