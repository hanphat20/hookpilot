'use client';
import { useState } from 'react';

export default function Page(){
  const [input,setInput]=useState('');
  const [out,setOut]=useState('');

  async function gen(){
    const res=await fetch('/api/ai/listing',{method:'POST',body:JSON.stringify({text:input})});
    const d=await res.json();
    setOut(d.text);
  }

  return (
    <div style={{padding:40,color:'#fff'}}>
      <h1>Listing Generator</h1>
      <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter property" />
      <button onClick={gen}>Generate</button>
      <pre>{out}</pre>
    </div>
  );
}