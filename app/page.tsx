'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type Row = { confidence: number; home?: { name?: string }; local?: { name?: string } };

export default function Home() {
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState<string>();
  const envOK = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    supabase
      .from('equivalents')
      .select(`
        confidence,
        home:home_brand_id ( name ),
        local:local_brand_id ( name )
      `)
      .then(({ data, error }) => {
        if (error) setErr(error.message);
        if (data) setRows(data as Row[]);
      });
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Comtra Travel Hub 🌍</h1>

      <div style={{ margin: '8px 0', padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
        <strong>Environment:</strong> {envOK ? '✅ NEXT_PUBLIC vars detected' : '❌ Missing env vars'}
      </div>

      {err && (
        <div style={{ margin: '8px 0', padding: 12, background: '#ffeaea', border: '1px solid #ffb3b3', borderRadius: 8 }}>
          <strong>Error:</strong> {err}
        </div>
      )}

      <h3>Brand Equivalents</h3>
      <ul>
        {rows.map((r, i) => (
          <li key={i}>{r.home?.name} → {r.local?.name} (confidence {r.confidence})</li>
        ))}
      </ul>

      {rows.length === 0 && !err && <p>Loading…</p>}
    </main>
  );
}
